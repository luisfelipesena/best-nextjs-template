# Implementation Rules

## Component Implementation

### 1. Component Structure
```typescript
// ✅ Good: Clear structure with proper separation
interface Props {
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

export function UserForm({ onSubmit, isLoading }: Props) {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        placeholder="Name"
      />
      <Input
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        placeholder="Email"
        type="email"
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save'}
      </Button>
    </form>
  );
}
```

### 2. Service Implementation
```typescript
// ✅ Good: Clean service with proper error handling
export class UserService {
  constructor(private readonly db: Database) {}

  async createUser(input: CreateUserDto): Promise<User> {
    // Validate input
    const validatedInput = createUserSchema.parse(input);

    // Check business rules
    const existingUser = await this.db
      .select()
      .from(users)
      .where(eq(users.email, validatedInput.email))
      .limit(1);

    if (existingUser.length > 0) {
      throw new Error('User with this email already exists');
    }

    // Create user
    const newUser = await this.db
      .insert(users)
      .values({
        ...validatedInput,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()
      .execute();

    return newUser[0];
  }
}
```

### 3. DTO Implementation
```typescript
// ✅ Good: Comprehensive validation with proper types
export const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email format'),
  age: z.number().min(13, 'Must be at least 13 years old').max(120),
  role: z.enum(['user', 'admin'], { required_error: 'Role is required' }),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
```

## Backend Implementation Rules

### 1. Route Structure
```typescript
// src/server/routes/users/users.route.ts
import { createTRPCRouter, publicProcedure, protectedProcedure } from '@/server/trpc/core';
import { createUserDto, updateUserDto } from './users.dto';
import { UserService } from './users.service';

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(createUserDto)
    .mutation(async ({ ctx, input }) => {
      const service = new UserService(ctx.db);
      return service.createUser(input);
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const service = new UserService(ctx.db);
      return service.getUserById(input.id);
    }),

  update: protectedProcedure
    .input(updateUserDto)
    .mutation(async ({ ctx, input }) => {
      const service = new UserService(ctx.db);
      return service.updateUser(ctx.auth.userId, input);
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const service = new UserService(ctx.db);
      return service.deleteUser(ctx.auth.userId, input.id);
    }),
});
```

### 2. Service Implementation
```typescript
// src/server/routes/users/users.service.ts
import { eq, and } from 'drizzle-orm';
import { users } from '@/server/db/schema';
import type { CreateUserDto, UpdateUserDto } from './users.dto';

export class UserService {
  constructor(private readonly db: Database) {}

  async createUser(input: CreateUserDto) {
    // Business logic here
    const newUser = await this.db
      .insert(users)
      .values({
        ...input,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()
      .execute();

    return newUser[0];
  }

  async getUserById(id: string) {
    const user = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1)
      .execute();

    if (!user[0]) {
      throw new Error('User not found');
    }

    return user[0];
  }

  async updateUser(userId: string, input: UpdateUserDto) {
    // Check if user exists and has permission
    const existingUser = await this.getUserById(userId);

    const updatedUser = await this.db
      .update(users)
      .set({
        ...input,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning()
      .execute();

    return updatedUser[0];
  }

  async deleteUser(userId: string, targetUserId: string) {
    // Check permissions (admin or self)
    if (userId !== targetUserId) {
      // Check if user is admin
      const currentUser = await this.getUserById(userId);
      if (currentUser.role !== 'admin') {
        throw new Error('Insufficient permissions');
      }
    }

    const deletedUser = await this.db
      .delete(users)
      .where(eq(users.id, targetUserId))
      .returning()
      .execute();

    return deletedUser[0];
  }
}
```

### 3. DTO Implementation
```typescript
// src/server/routes/users/users.dto.ts
import { z } from 'zod';

export const createUserDto = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  age: z.number().min(13).max(120),
  role: z.enum(['user', 'admin']),
});

export const updateUserDto = z.object({
  name: z.string().min(2).max(50).optional(),
  email: z.string().email().optional(),
  age: z.number().min(13).max(120).optional(),
});

export type CreateUserDto = z.infer<typeof createUserDto>;
export type UpdateUserDto = z.infer<typeof updateUserDto>;
```

## Frontend Implementation Rules

### 1. Feature Component Structure
```typescript
// src/features/auth/login-form.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTRPCMutation } from '@/hooks/use-trpc';
import { trpc } from '@/lib/trpc';
import { loginSchema, type LoginFormData } from './auth-schemas';

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useTRPCMutation(
    (data: LoginFormData) => trpc.auth.login.mutate(data),
    {
      onSuccess: () => {
        // Handle success
        setError(null);
      },
      onError: (error) => {
        setError(error.message);
      },
    },
  );

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register('password')}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

### 2. Hook Implementation
```typescript
// src/hooks/use-auth.ts
import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/lib/trpc';

export function useAuth() {
  const { data: session, isLoading, error } = useQuery({
    queryKey: ['auth', 'session'],
    queryFn: () => trpc.auth.session.query(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const isAuthenticated = !!session?.user;
  const user = session?.user;

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
  };
}
```

### 3. Schema Implementation
```typescript
// src/features/auth/auth-schemas.ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
```

## Testing Rules

### 1. Unit Test Structure
```typescript
// src/__tests__/services/user.service.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UserService } from '@/server/routes/users/users.service';
import { users } from '@/server/db/schema';

describe('UserService', () => {
  let service: UserService;
  let mockDb: any;

  beforeEach(() => {
    mockDb = {
      insert: vi.fn().mockReturnThis(),
      values: vi.fn().mockReturnThis(),
      returning: vi.fn().mockReturnThis(),
      execute: vi.fn(),
      select: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
    };

    service = new UserService(mockDb);
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      const input = { name: 'John Doe', email: 'john@example.com', age: 25, role: 'user' };
      const expectedUser = { id: '1', ...input, createdAt: new Date(), updatedAt: new Date() };

      mockDb.execute.mockResolvedValue([expectedUser]);

      const result = await service.createUser(input);

      expect(result).toEqual(expectedUser);
      expect(mockDb.insert).toHaveBeenCalledWith(users);
    });

    it('should throw error when email already exists', async () => {
      const input = { name: 'John Doe', email: 'john@example.com', age: 25, role: 'user' };

      mockDb.execute.mockResolvedValue([{ email: input.email }]);

      await expect(service.createUser(input)).rejects.toThrow('User with this email already exists');
    });
  });
});
```

### 2. Component Test Structure
```typescript
// src/__tests__/components/user-form.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserForm } from '@/components/user-form';

describe('UserForm', () => {
  it('should render form fields', () => {
    const mockOnSubmit = vi.fn();

    render(<UserForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('should call onSubmit with form data', async () => {
    const mockOnSubmit = vi.fn();

    render(<UserForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
    });
  });
});
```

## Best Practices Summary

1. **Component Size**: Keep components under 350 lines
2. **Single Responsibility**: Each file should have one clear purpose
3. **Type Safety**: Use TypeScript properly with no `any` types
4. **Error Handling**: Always handle errors gracefully
5. **Validation**: Use Zod for all input/output validation
6. **Testing**: Write comprehensive tests for all business logic
7. **Performance**: Optimize for performance and user experience
8. **Security**: Follow security best practices
9. **Documentation**: Document complex logic and APIs
10. **Consistency**: Follow established patterns and conventions
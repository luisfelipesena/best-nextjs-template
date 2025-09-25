import type { Context } from '@/server/trpc/context';
import type { UpdateProfileDto, LoginDto, RegisterDto } from './auth.dto';
import { schema } from '@/server/db';
import { eq } from 'drizzle-orm';

export class AuthService {
  constructor(private readonly ctx: Context) {}

  async getSession() {
    return this.ctx.auth?.session || null;
  }

  async getProfile() {
    const session = this.ctx.auth?.session;
    if (!session) {
      throw new Error('Unauthorized');
    }

    // For now, return a mock user profile
    return {
      id: session.userId,
      email: 'user@example.com',
      name: 'Test User',
    };
  }

  async login(_input: LoginDto) {
    // This would typically use better-auth's signIn method
    // For now, we'll return a mock response
    throw new Error('Login should be handled by better-auth directly');
  }

  async register(_input: RegisterDto) {
    // This would typically use better-auth's signUp method
    // For now, we'll return a mock response
    throw new Error('Register should be handled by better-auth directly');
  }

  async updateProfile(input: UpdateProfileDto) {
    const session = this.ctx.auth?.session;
    if (!session) {
      throw new Error('Unauthorized');
    }

    const updated = await this.ctx.db
      .update(schema.users)
      .set({ name: input.name })
      .where(eq(schema.users.id, session.userId))
      .returning({ id: schema.users.id, name: schema.users.name });

    return updated[0];
  }
}


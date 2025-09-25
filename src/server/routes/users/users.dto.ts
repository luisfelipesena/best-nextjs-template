import { z } from 'zod';

export const createUserDto = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
});

export const updateUserDto = z.object({
  id: z.string(),
  name: z.string().min(2).max(50).optional(),
  email: z.string().email().optional(),
});

export const getUserByIdDto = z.object({
  id: z.string(),
});

export type CreateUserDto = z.infer<typeof createUserDto>;
export type UpdateUserDto = z.infer<typeof updateUserDto>;
export type GetUserByIdDto = z.infer<typeof getUserByIdDto>;
import { z } from 'zod';

export const updateProfileDto = z.object({
  name: z.string().min(2).max(50),
});

export const loginDto = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerDto = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
});

export type UpdateProfileDto = z.infer<typeof updateProfileDto>;
export type LoginDto = z.infer<typeof loginDto>;
export type RegisterDto = z.infer<typeof registerDto>;


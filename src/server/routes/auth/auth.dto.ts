import { z } from 'zod';

export const updateProfileDto = z.object({
  name: z.string().min(2).max(50),
});

export type UpdateProfileDto = z.infer<typeof updateProfileDto>;


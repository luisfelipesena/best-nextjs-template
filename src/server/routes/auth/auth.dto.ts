import { z } from 'zod'

// Auth DTOs
export const loginDto = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export const registerDto = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(50, 'Nome muito longo'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export const updateProfileDto = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(50, 'Nome muito longo'),
})

export const changePasswordDto = z.object({
  currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
  newPassword: z.string().min(6, 'Nova senha deve ter pelo menos 6 caracteres'),
})

// Types
export type LoginDto = z.infer<typeof loginDto>
export type RegisterDto = z.infer<typeof registerDto>
export type UpdateProfileDto = z.infer<typeof updateProfileDto>
export type ChangePasswordDto = z.infer<typeof changePasswordDto>

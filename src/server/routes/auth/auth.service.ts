import { TRPCError } from '@trpc/server'
import type { Context } from '@/server/trpc/context'
import type { UpdateProfileDto, ChangePasswordDto } from './auth.dto'

interface UserProfile {
  id: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}

interface UserStats {
  totalLogins: number
  lastLogin: Date
  accountCreated: Date
  profileCompleteness: number
}

interface ChangePasswordResponse {
  success: boolean
  message: string
}

interface UpdateProfileResponse {
  id: string
  name: string
}

export class AuthService {
  constructor(private readonly ctx: Context) {}

  async getSession(): Promise<Context['auth']['session']> {
    return this.ctx.auth?.session || null
  }

  async getProfile(): Promise<UserProfile> {
    const session = this.ctx.auth?.session
    if (!session) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Você precisa estar logado para acessar seu perfil',
      })
    }

    // Mock user profile - in real app, this would come from database
    return {
      id: 'mock-user-id',
      name: 'Mock User',
      email: 'user@example.com',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
    }
  }

  async updateProfile(input: UpdateProfileDto): Promise<UpdateProfileResponse> {
    const session = this.ctx.auth?.session
    if (!session) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Você precisa estar logado para atualizar seu perfil',
      })
    }

    try {
      // In real app, update user in database using Drizzle
      const updated: UpdateProfileResponse = {
        id: 'mock-user-id',
        name: input.name,
      }

      return updated
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Erro ao atualizar perfil',
        cause: error,
      })
    }
  }

  async changePassword(input: ChangePasswordDto): Promise<ChangePasswordResponse> {
    const session = this.ctx.auth?.session
    if (!session) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Você precisa estar logado para alterar sua senha',
      })
    }

    try {
      // In real app:
      // 1. Verify current password against database
      // 2. Hash new password
      // 3. Update password in database
      console.log('Password change requested for user:', session, 'New password length:', input.newPassword.length)
      
      return { success: true, message: 'Senha alterada com sucesso' }
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Erro ao alterar senha',
        cause: error,
      })
    }
  }

  async getUserStats(): Promise<UserStats> {
    const session = this.ctx.auth?.session
    if (!session) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Você precisa estar logado para ver estatísticas',
      })
    }

    // Mock stats - in real app, calculate from database
    return {
      totalLogins: 42,
      lastLogin: new Date(),
      accountCreated: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      profileCompleteness: 85,
    }
  }
}


import { TRPCError } from '@trpc/server'
import type { Context } from '@/server/trpc/context'
import type { UpdateProfileDto, ChangePasswordDto } from './auth.dto'

export class AuthService {
  constructor(private readonly ctx: Context) {}

  async getSession() {
    return this.ctx.auth?.session || null
  }

  async getProfile() {
    const session = this.ctx.auth?.session
    if (!session) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Você precisa estar logado para acessar seu perfil',
      })
    }

    return session as any // TODO: Fix typing
  }

  async updateProfile(input: UpdateProfileDto) {
    const session = this.ctx.auth?.session
    if (!session) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Você precisa estar logado para atualizar seu perfil',
      })
    }

    try {
      // TODO: Update user in database
      // For now, return mock data
      const updated = {
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

  async changePassword(_input: ChangePasswordDto) {
    const session = this.ctx.auth?.session
    if (!session) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Você precisa estar logado para alterar sua senha',
      })
    }

    try {
      // TODO: Implement password change logic
      // 1. Verify current password
      // 2. Hash new password
      // 3. Update in database
      
      return { success: true, message: 'Senha alterada com sucesso' }
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Erro ao alterar senha',
        cause: error,
      })
    }
  }

  async getUserStats() {
    const session = this.ctx.auth?.session
    if (!session) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Você precisa estar logado para ver estatísticas',
      })
    }

    // TODO: Implement real stats from database
    return {
      totalLogins: 42,
      lastLogin: new Date(),
      accountCreated: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      profileCompleteness: 85,
    }
  }
}


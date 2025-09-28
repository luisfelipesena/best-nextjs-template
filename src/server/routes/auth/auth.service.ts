import { TRPCError } from '@trpc/server'
import { eq, count, and } from 'drizzle-orm'
import { hash, verify } from '@node-rs/argon2'
import type { Context } from '@/server/trpc/context'
import { user, activityLogs } from '@/server/db/schema'
import type { UpdateProfileDto, ChangePasswordDto } from './auth.dto'

interface UserProfile {
  id: string
  name: string | null
  email: string
  createdAt: Date
  updatedAt: Date
}

interface UserStats {
  totalLogins: number
  lastLogin: Date | null
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
    const currentUser = this.ctx.auth?.user
    if (!currentUser) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Você precisa estar logado para acessar seu perfil',
      })
    }

    // Get user data from database
    const dbUser = await this.ctx.db.query.user.findFirst({
      where: (userTable, { eq }) => eq(userTable.id, currentUser.id),
      columns: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!dbUser) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Perfil de usuário não encontrado',
      })
    }

    return dbUser
  }

  async updateProfile(input: UpdateProfileDto): Promise<UpdateProfileResponse> {
    const currentUser = this.ctx.auth?.user
    if (!currentUser) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Você precisa estar logado para atualizar seu perfil',
      })
    }

    try {
      // Update user in database using Drizzle
      const [updatedUser] = await this.ctx.db
        .update(user)
        .set({
          name: input.name,
          updatedAt: new Date(),
        })
        .where(eq(user.id, currentUser.id))
        .returning({
          id: user.id,
          name: user.name,
        })

      if (!updatedUser) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Usuário não encontrado',
        })
      }

      return {
        id: updatedUser.id,
        name: updatedUser.name || '',
      }
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error
      }
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Erro ao atualizar perfil',
        cause: error,
      })
    }
  }

  async changePassword(input: ChangePasswordDto): Promise<ChangePasswordResponse> {
    const currentUser = this.ctx.auth?.user
    if (!currentUser) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Você precisa estar logado para alterar sua senha',
      })
    }

    try {
      // Get current user with password hash
      const dbUser = await this.ctx.db.query.user.findFirst({
        where: (userTable, { eq }) => eq(userTable.id, currentUser.id),
        columns: {
          id: true,
          passwordHash: true,
        },
      })

      if (!dbUser) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Usuário não encontrado',
        })
      }

      // Verify current password if provided
      if (input.currentPassword && dbUser.passwordHash) {
        const isValidPassword = await verify(dbUser.passwordHash, input.currentPassword)
        if (!isValidPassword) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Senha atual incorreta',
          })
        }
      }

      // Hash new password
      const newPasswordHash = await hash(input.newPassword)

      // Update password in database
      await this.ctx.db
        .update(user)
        .set({
          passwordHash: newPasswordHash,
          updatedAt: new Date(),
        })
        .where(eq(user.id, currentUser.id))

      return { success: true, message: 'Senha alterada com sucesso' }
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error
      }
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Erro ao alterar senha',
        cause: error,
      })
    }
  }

  async getUserStats(): Promise<UserStats> {
    const currentUser = this.ctx.auth?.user
    if (!currentUser) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Você precisa estar logado para ver estatísticas',
      })
    }

    try {
      // Get user data
      const dbUser = await this.ctx.db.query.user.findFirst({
        where: (userTable, { eq }) => eq(userTable.id, currentUser.id),
        columns: {
          createdAt: true,
          lastLoginAt: true,
          name: true,
          email: true,
          image: true,
        },
      })

      if (!dbUser) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Usuário não encontrado',
        })
      }

      // Count login activities
      const loginCount = await this.ctx.db
        .select({ count: count() })
        .from(activityLogs)
        .where(and(eq(activityLogs.userId, currentUser.id), eq(activityLogs.type, 'user_login')))

      // Calculate profile completeness
      let completeness = 0
      if (dbUser.name) completeness += 25
      if (dbUser.email) completeness += 25
      if (dbUser.image) completeness += 25
      completeness += 25 // For having an account

      return {
        totalLogins: loginCount[0]?.count || 0,
        lastLogin: dbUser.lastLoginAt,
        accountCreated: dbUser.createdAt,
        profileCompleteness: completeness,
      }
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error
      }
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Erro ao obter estatísticas',
        cause: error,
      })
    }
  }
}

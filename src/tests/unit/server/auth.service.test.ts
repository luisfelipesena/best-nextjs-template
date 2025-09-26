import { describe, it, expect, beforeEach } from 'vitest'
import { TRPCError } from '@trpc/server'
import { AuthService } from '@/server/routes/auth/auth.service'
import { createMockContext, createMockContextWithoutAuth } from '@/tests/__mocks__/context'

describe('AuthService', () => {
  let service: AuthService
  let mockContext: ReturnType<typeof createMockContext>

  beforeEach(() => {
    mockContext = createMockContext()
    service = new AuthService(mockContext)
  })

  describe('getSession', () => {
    it('should return session when available', async () => {
      const result = await service.getSession()
      expect(result).toEqual(mockContext.auth.session)
    })

    it('should return null when no session', async () => {
      const contextWithoutAuth = createMockContextWithoutAuth()
      const serviceWithoutAuth = new AuthService(contextWithoutAuth)
      
      const result = await serviceWithoutAuth.getSession()
      expect(result).toBeNull()
    })
  })

  describe('getProfile', () => {
    it('should return user profile when authenticated', async () => {
      const result = await service.getProfile()
      expect(result).toEqual({
        id: 'mock-user-id',
        name: 'Mock User',
        email: 'user@example.com',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should throw UNAUTHORIZED when not authenticated', async () => {
      const contextWithoutAuth = createMockContextWithoutAuth()
      const serviceWithoutAuth = new AuthService(contextWithoutAuth)

      await expect(serviceWithoutAuth.getProfile()).rejects.toThrow(TRPCError)
      await expect(serviceWithoutAuth.getProfile()).rejects.toThrow('Você precisa estar logado')
    })
  })

  describe('updateProfile', () => {
    it('should update profile successfully', async () => {
      const input = { name: 'Updated Name' }
      const result = await service.updateProfile(input)

      expect(result).toEqual({
        id: 'mock-user-id',
        name: input.name,
      })
    })

    it('should throw UNAUTHORIZED when not authenticated', async () => {
      const contextWithoutAuth = createMockContextWithoutAuth()
      const serviceWithoutAuth = new AuthService(contextWithoutAuth)
      const input = { name: 'Updated Name' }

      await expect(serviceWithoutAuth.updateProfile(input)).rejects.toThrow(TRPCError)
      await expect(serviceWithoutAuth.updateProfile(input)).rejects.toThrow('Você precisa estar logado')
    })
  })

  describe('changePassword', () => {
    it('should change password successfully', async () => {
      const input = {
        currentPassword: 'oldpassword',
        newPassword: 'newpassword123',
      }

      const result = await service.changePassword(input)
      expect(result).toEqual({
        success: true,
        message: 'Senha alterada com sucesso',
      })
    })

    it('should throw UNAUTHORIZED when not authenticated', async () => {
      const contextWithoutAuth = createMockContextWithoutAuth()
      const serviceWithoutAuth = new AuthService(contextWithoutAuth)
      const input = {
        currentPassword: 'oldpassword',
        newPassword: 'newpassword123',
      }

      await expect(serviceWithoutAuth.changePassword(input)).rejects.toThrow(TRPCError)
    })
  })

  describe('getUserStats', () => {
    it('should return user stats when authenticated', async () => {
      const result = await service.getUserStats()

      expect(result).toMatchObject({
        totalLogins: expect.any(Number),
        lastLogin: expect.any(Date),
        accountCreated: expect.any(Date),
        profileCompleteness: expect.any(Number),
      })
    })

    it('should throw UNAUTHORIZED when not authenticated', async () => {
      const contextWithoutAuth = createMockContextWithoutAuth()
      const serviceWithoutAuth = new AuthService(contextWithoutAuth)

      await expect(serviceWithoutAuth.getUserStats()).rejects.toThrow(TRPCError)
    })
  })
})
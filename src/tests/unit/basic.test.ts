import { describe, it, expect } from 'vitest'
import { LoginSchema, RegisterSchema } from '@/features/auth/types'

describe('Basic Template Tests', () => {
  describe('Auth Schemas', () => {
    it('should validate login schema correctly', () => {
      const validLogin = {
        email: 'test@example.com',
        password: 'password123',
      }

      const result = LoginSchema.safeParse(validLogin)
      expect(result.success).toBe(true)
    })

    it('should reject invalid email', () => {
      const invalidLogin = {
        email: 'invalid-email',
        password: 'password123',
      }

      const result = LoginSchema.safeParse(invalidLogin)
      expect(result.success).toBe(false)
    })

    it('should validate register schema correctly', () => {
      const validRegister = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      }

      const result = RegisterSchema.safeParse(validRegister)
      expect(result.success).toBe(true)
    })

    it('should reject mismatched passwords', () => {
      const invalidRegister = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'different-password',
      }

      const result = RegisterSchema.safeParse(invalidRegister)
      expect(result.success).toBe(false)
    })
  })

  describe('Template Structure', () => {
    it('should have correct environment setup', () => {
      expect(process.env.NODE_ENV).toBeDefined()
    })
  })
})

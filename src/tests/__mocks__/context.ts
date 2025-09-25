import { vi } from 'vitest'
import type { Context } from '@/server/trpc/context'

export function createMockContext(): Context {
  return {
    db: {
      query: vi.fn(),
      insert: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      select: vi.fn(),
    } as unknown,
    auth: {
      session: {
        user: {
          id: 'test-user-id',
          name: 'Test User',
          email: 'test@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        id: 'test-session-id',
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
  }
}

export function createMockContextWithoutAuth(): Context {
  return {
    db: {
      query: vi.fn(),
      insert: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      select: vi.fn(),
    } as unknown,
    auth: {
      session: null,
    },
  }
}
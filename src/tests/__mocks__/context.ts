import { vi } from 'vitest'
import type { Context } from '@/server/trpc/context'
import type { Pool } from 'pg'

type MockDatabase = {
  query: ReturnType<typeof vi.fn>
  insert: ReturnType<typeof vi.fn>
  update: ReturnType<typeof vi.fn>
  delete: ReturnType<typeof vi.fn>
  select: ReturnType<typeof vi.fn>
  $client: Pool
}

export function createMockContext(): Context {
  const mockDb: MockDatabase = {
    query: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    select: vi.fn(),
    $client: {} as Pool,
  }

  return {
    db: mockDb as unknown as Context['db'],
    auth: {
      session: null, // Mock context starts with no session
      user: null,
    },
    req: undefined,
    res: undefined,
  }
}

export function createMockContextWithAuth(): Context {
  const mockDb: MockDatabase = {
    query: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    select: vi.fn(),
    $client: {} as Pool,
  }

  return {
    db: mockDb as unknown as Context['db'],
    auth: {
      session: {
        id: 'test-session-id',
        userId: 'test-user-id',
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
        token: 'test-token',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      user: {
        id: 'test-user-id',
        email: 'test@example.com',
        name: 'Test User',
        image: null,
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
    req: undefined,
    res: undefined,
  }
}

export function createMockContextWithoutAuth(): Context {
  return createMockContext() // Same as default mock context
}

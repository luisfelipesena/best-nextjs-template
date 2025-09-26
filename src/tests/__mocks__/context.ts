import { vi } from 'vitest'
import type { Context } from '@/server/trpc/context'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import type { schema } from '@/server/db'

type MockDatabase = {
  query: ReturnType<typeof vi.fn>
  insert: ReturnType<typeof vi.fn>
  update: ReturnType<typeof vi.fn>
  delete: ReturnType<typeof vi.fn>
  select: ReturnType<typeof vi.fn>
}

export function createMockContext(): Context {
  const mockDb: MockDatabase = {
    query: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    select: vi.fn(),
  }

  return {
    db: mockDb as unknown as NodePgDatabase<typeof schema>,
    auth: {
      session: {
        id: 'test-session-id',
        userId: 'test-user-id',
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
        token: 'test-token',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
  }
}

export function createMockContextWithoutAuth(): Context {
  const mockDb: MockDatabase = {
    query: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    select: vi.fn(),
  }

  return {
    db: mockDb as unknown as NodePgDatabase<typeof schema>,
    auth: {
      session: null,
    },
  }
}
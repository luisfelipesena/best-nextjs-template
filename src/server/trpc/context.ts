import type { inferAsyncReturnType } from '@trpc/server'
import { db } from '@/server/db'

interface AuthSession {
  id: string
  userId: string
  expiresAt: Date
  token: string
  createdAt: Date
  updatedAt: Date
}

export async function createContext() {
  // Mock auth context for template - in real app, this would integrate with Better Auth
  const authContext: {
    session: AuthSession | null
  } = {
    session: null, // Will be populated when auth is working
  }

  return {
    db,
    auth: authContext,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>

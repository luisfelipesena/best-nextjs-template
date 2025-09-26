import type { inferAsyncReturnType } from '@trpc/server'
import { headers } from 'next/headers'
import { db } from '@/server/db'

export async function createContext() {
  // TODO: Implement auth context when database is available
  // For now, return mock context
  const authContext = {
    session: null, // Will be populated when auth is working
  }

  return {
    db,
    auth: authContext,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>

import type { inferAsyncReturnType } from '@trpc/server'
import type { CreateNextContextOptions } from '@trpc/server/adapters/next'
import { db } from '@/server/db'
import { auth } from '@/server/auth'
import { headers, cookies } from 'next/headers'

export async function createContext(opts?: CreateNextContextOptions | { req: Request }) {
  const req = opts?.req
  const res = opts && 'res' in opts ? opts.res : undefined

  // Get session from Better Auth
  let session = null
  let user = null

  try {
    // Try to get session from Better Auth
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('better-auth.session_token')

    if (sessionCookie) {
      const sessionData = await auth.api.getSession({
        headers: await headers(),
      })

      if (sessionData?.session && sessionData?.user) {
        session = sessionData.session
        user = sessionData.user
      }
    }
  } catch (error) {
    console.error('Error getting session:', error)
    // Session will remain null
  }

  return {
    db,
    auth: {
      session,
      user,
    },
    req,
    res,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>

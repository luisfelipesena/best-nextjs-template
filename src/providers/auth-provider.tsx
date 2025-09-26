'use client'

import { ReactNode } from 'react'
import { createAuthClient } from 'better-auth/react'

const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
})

export function AuthProvider({ children }: { children: ReactNode }) {
  return <authClient.Provider>{children}</authClient.Provider>
}

export { authClient }

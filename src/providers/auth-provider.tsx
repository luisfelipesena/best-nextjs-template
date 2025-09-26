'use client'

import { ReactNode } from 'react'

// Mock auth client for template - in real app, this would use Better Auth
export const authClient = {
  useSession: () => ({
    data: null,
    isPending: false,
    error: null,
    refetch: () => Promise.resolve(),
  }),
  signIn: {
    email: async (credentials: { email: string; password: string }) => {
      console.log('Mock sign in:', credentials)
      return { data: null, error: { message: 'Auth not implemented yet' } }
    },
  },
  signUp: {
    email: async (credentials: { email: string; password: string; name: string }) => {
      console.log('Mock sign up:', credentials)
      return { data: null, error: { message: 'Auth not implemented yet' } }
    },
  },
  signOut: {
    email: async () => {
      console.log('Mock sign out')
      return { data: null }
    },
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}

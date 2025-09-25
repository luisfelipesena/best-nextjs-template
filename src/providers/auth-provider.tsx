'use client'

import { ReactNode } from 'react'

// TODO: Implement proper AuthProvider with Better Auth
export function AuthProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}

// TODO: Implement proper authClient
export const authClient = {}

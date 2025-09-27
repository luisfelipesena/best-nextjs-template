'use client'

import { TrpcProvider } from './trpc-provider'
import { AuthProvider } from './auth-provider'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <TrpcProvider>
      <AuthProvider>{children}</AuthProvider>
    </TrpcProvider>
  )
}

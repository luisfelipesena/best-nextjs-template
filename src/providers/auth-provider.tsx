'use client'

import { ReactNode, createContext, useContext, useState, useEffect } from 'react'
import { createAuthClient } from 'better-auth/react'
import { useRouter } from 'next/navigation'

const authClient = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_APP_URL ||
    (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'),
})

interface User {
  id: string
  name: string | null
  email: string
}

interface AuthSession {
  id: string
  userId: string
  expiresAt: Date
}

interface AuthContextType {
  user: User | null
  session: AuthSession | null
  isLoading: boolean
  signIn: (credentials: { email: string; password: string }) => Promise<{ data?: User; error?: { message: string } }>
  signUp: (credentials: {
    email: string
    password: string
    name: string
  }) => Promise<{ data?: User; error?: { message: string } }>
  signOut: () => Promise<void>
  refetch: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<AuthSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const fetchSession = async () => {
    try {
      const sessionData = await authClient.getSession()

      if (sessionData.data?.user && sessionData.data?.session) {
        setUser(sessionData.data.user)
        setSession(sessionData.data.session)
      } else {
        setUser(null)
        setSession(null)
      }
    } catch (err) {
      console.error('Error fetching session:', err)
      setUser(null)
      setSession(null)
    } finally {
      setIsLoading(false)
    }
  }

  const signIn = async (credentials: { email: string; password: string }) => {
    try {
      const result = await authClient.signIn.email({
        email: credentials.email,
        password: credentials.password,
      })

      if (result.error) {
        return { error: { message: result.error.message || 'Login failed' } }
      }

      if (result.data?.user) {
        const userData = result.data.user
        setUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
        })
        // Session will be handled by Better Auth cookies
        setSession({
          id: 'session-id',
          userId: userData.id,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        })
        return {
          data: {
            id: userData.id,
            name: userData.name,
            email: userData.email,
          },
        }
      }

      return { error: { message: 'Login failed' } }
    } catch (err) {
      console.error('Sign in error:', err)
      return { error: { message: 'Network error' } }
    }
  }

  const signUp = async (credentials: { email: string; password: string; name: string }) => {
    try {
      const result = await authClient.signUp.email({
        email: credentials.email,
        password: credentials.password,
        name: credentials.name,
      })

      if (result.error) {
        return { error: { message: result.error.message || 'Registration failed' } }
      }

      if (result.data?.user) {
        const userData = result.data.user
        setUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
        })
        // Session will be handled by Better Auth cookies
        setSession({
          id: 'session-id',
          userId: userData.id,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        })
        return {
          data: {
            id: userData.id,
            name: userData.name,
            email: userData.email,
          },
        }
      }

      return { error: { message: 'Registration failed' } }
    } catch (err) {
      console.error('Sign up error:', err)
      return { error: { message: 'Network error' } }
    }
  }

  const signOut = async () => {
    try {
      await authClient.signOut()
      setUser(null)
      setSession(null)
      router.push('/')
    } catch (err) {
      console.error('Error signing out:', err)
    }
  }

  useEffect(() => {
    fetchSession()
  }, [])

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    refetch: fetchSession,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }
  return context
}

// Export the auth client for direct use if needed
export { authClient }

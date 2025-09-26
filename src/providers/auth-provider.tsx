'use client'

import { ReactNode, createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  name: string
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
  signUp: (credentials: { email: string; password: string; name: string }) => Promise<{ data?: User; error?: { message: string } }>
  signOut: () => Promise<void>
  refetch: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<AuthSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchSession = async () => {
    try {
      const response = await fetch('/api/auth/session')
      const data = await response.json()
      
      if (data.user && data.session) {
        setUser(data.user)
        setSession(data.session)
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
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setUser(data.user)
        await fetchSession()
        return { data: data.user }
      } else {
        return { error: { message: data.error || 'Login failed' } }
      }
    } catch {
      return { error: { message: 'Network error' } }
    }
  }

  const signUp = async (credentials: { email: string; password: string; name: string }) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setUser(data.user)
        await fetchSession()
        return { data: data.user }
      } else {
        return { error: { message: data.error || 'Registration failed' } }
      }
    } catch {
      return { error: { message: 'Network error' } }
    }
  }

  const signOut = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setUser(null)
      setSession(null)
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

// Export for compatibility with existing code
export const authClient = {
  // These will be used by legacy hooks if needed
}

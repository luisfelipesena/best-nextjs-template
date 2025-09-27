import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  })),
  usePathname: vi.fn(() => '/'),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}))

// Mock Next.js headers
vi.mock('next/headers', () => ({
  headers: vi.fn(() => Promise.resolve(new Headers())),
  cookies: vi.fn(() =>
    Promise.resolve({
      get: vi.fn(),
      set: vi.fn(),
      delete: vi.fn(),
    })
  ),
}))

// Mock environment variables for testing
process.env.DATABASE_URL = process.env.DATABASE_URL_TEST || 'postgresql://test:test@localhost:5432/test'
process.env.BETTER_AUTH_SECRET = 'test-secret-key-32-characters-long-for-testing'
process.env.BETTER_AUTH_BASE_URL = 'http://localhost:3000'
process.env.NEXT_PUBLIC_APP_NAME = 'Test App'
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000'

// Mock Better Auth for unit tests
vi.mock('better-auth/react', () => ({
  createAuthClient: vi.fn(() => ({
    getSession: vi.fn(() => Promise.resolve({ data: null })),
    signIn: {
      email: vi.fn(() => Promise.resolve({ data: null, error: null })),
    },
    signUp: {
      email: vi.fn(() => Promise.resolve({ data: null, error: null })),
    },
    signOut: vi.fn(() => Promise.resolve()),
  })),
}))

import { vi } from 'vitest'

// Mock TRPC client
export const mockTrpcClient = {
  auth: {
    session: {
      useQuery: vi.fn(),
    },
    profile: {
      useQuery: vi.fn(),
    },
    updateProfile: {
      useMutation: vi.fn(),
    },
    changePassword: {
      useMutation: vi.fn(),
    },
    userStats: {
      useQuery: vi.fn(),
    },
  },
  dashboard: {
    stats: {
      useQuery: vi.fn(),
    },
    recentActivity: {
      useQuery: vi.fn(),
    },
    analytics: {
      useQuery: vi.fn(),
    },
  },
}

// Mock TRPC provider
export function createTRPCMsw() {
  return {
    auth: {
      session: vi.fn(),
      profile: vi.fn(),
      updateProfile: vi.fn(),
      changePassword: vi.fn(),
      userStats: vi.fn(),
    },
    dashboard: {
      stats: vi.fn(),
      recentActivity: vi.fn(),
      analytics: vi.fn(),
    },
  }
}

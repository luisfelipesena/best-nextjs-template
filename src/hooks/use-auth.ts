'use client'

// TODO: Implement proper auth hook with TRPC
export function useAuth() {
  return {
    // Session data
    session: null,
    user: null,
    isLoading: false,
    isAuthenticated: false,

    // Profile data
    profile: null,
    isProfileLoading: false,

    // User stats
    userStats: null,
    isUserStatsLoading: false,

    // Mutations
    updateProfile: () => {},
    isUpdatingProfile: false,
    
    changePassword: () => {},
    isChangingPassword: false,

    // Refetch functions
    refetchSession: () => {},
    refetchProfile: () => {},
    refetchUserStats: () => {},
  }
}
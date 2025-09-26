'use client'

import { authClient } from '@/providers/auth-provider'
import { trpc } from '@/server/trpc/client'

export function useAuth() {
  const session = authClient.useSession()
  const signIn = authClient.signIn
  const signUp = authClient.signUp
  const signOut = authClient.signOut

  const isAuthenticated = !!session.data
  
  const profileQuery = trpc.auth.profile.useQuery(undefined, {
    enabled: isAuthenticated,
  })

  const updateProfileMutation = trpc.auth.updateProfile.useMutation({
    onSuccess: () => {
      profileQuery.refetch()
    },
  })

  const changePasswordMutation = trpc.auth.changePassword.useMutation()

  return {
    // Session data
    session: session.data || null,
    user: session.data || null,
    isLoading: session.isPending,
    isAuthenticated,
    error: session.error,

    // Auth actions
    signIn,
    signUp,
    signOut,

    // Profile data
    profile: profileQuery.data,
    isProfileLoading: profileQuery.isLoading,

    // Mutations
    updateProfile: updateProfileMutation.mutate,
    isUpdatingProfile: updateProfileMutation.isPending,
    
    changePassword: changePasswordMutation.mutate,
    isChangingPassword: changePasswordMutation.isPending,

    // Refetch functions
    refetchSession: session.refetch,
    refetchProfile: profileQuery.refetch,
  }
}
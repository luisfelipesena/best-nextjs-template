'use client'

import { useAuthContext } from '@/providers/auth-provider'
import { trpc } from '@/server/trpc/client'

export function useAuth() {
  const { user, session, isLoading, signIn, signUp, signOut, refetch } = useAuthContext()

  const isAuthenticated = !!user

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
    session,
    user,
    isLoading,
    isAuthenticated,
    error: null,

    // Auth actions
    signIn: {
      email: signIn,
    },
    signUp: {
      email: signUp,
    },
    signOut: {
      email: signOut,
    },

    // Profile data
    profile: profileQuery.data,
    isProfileLoading: profileQuery.isLoading,

    // Mutations
    updateProfile: updateProfileMutation.mutate,
    isUpdatingProfile: updateProfileMutation.isPending,

    changePassword: changePasswordMutation.mutate,
    isChangingPassword: changePasswordMutation.isPending,

    // Refetch functions
    refetchSession: refetch,
    refetchProfile: profileQuery.refetch,
  }
}

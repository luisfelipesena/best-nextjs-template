import { useAuthContext } from '@/providers/auth-provider'

export function useAuthSession() {
  const { user, session, isLoading, refetch } = useAuthContext()

  return {
    data: session ? { user, session } : null,
    isPending: isLoading,
    error: null,
    refetch,
  }
}

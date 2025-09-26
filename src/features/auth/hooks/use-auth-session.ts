import { authClient } from '@/providers/auth-provider'

export function useAuthSession() {
  return authClient.useSession()
}

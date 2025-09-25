// Temporarily simplified auth session hook
export function useAuthSession() {
  return {
    data: null,
    isPending: false,
    error: null,
  };
}

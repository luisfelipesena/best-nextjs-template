import { trpc } from '@/server/trpc/client';

export function useUsers() {
  const { data: users, isLoading, error } = trpc.users.list.useQuery();

  return {
    users: users || [],
    isLoading,
    error,
  };
}

export function useUser(id: string) {
  const { data: user, isLoading, error } = trpc.users.getById.useQuery(
    { id },
    { enabled: !!id }
  );

  return {
    user,
    isLoading,
    error,
  };
}

export function useCreateUser() {
  const utils = trpc.useUtils();
  
  return trpc.users.create.useMutation({
    onSuccess: () => {
      // Invalidate and refetch users list
      utils.users.list.invalidate();
    },
  });
}

export function useUpdateUser() {
  const utils = trpc.useUtils();
  
  return trpc.users.update.useMutation({
    onSuccess: () => {
      // Invalidate and refetch users list
      utils.users.list.invalidate();
    },
  });
}

export function useDeleteUser() {
  const utils = trpc.useUtils();
  
  return trpc.users.delete.useMutation({
    onSuccess: () => {
      // Invalidate and refetch users list
      utils.users.list.invalidate();
    },
  });
}
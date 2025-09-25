import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUsers, useUser } from '@/hooks/use-users';

// Mock TRPC
vi.mock('@/server/trpc/client', () => ({
  trpc: {
    users: {
      list: {
        useQuery: vi.fn(),
      },
      getById: {
        useQuery: vi.fn(),
      },
    },
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  const Wrapper = ({ children }: { children: React.ReactNode }) => 
    React.createElement(QueryClientProvider, { client: queryClient }, children);
  Wrapper.displayName = 'TestWrapper';
  return Wrapper;
};

describe('useUsers Hook', () => {
  it('should return users data', async () => {
    const mockUsers = [
      { id: '1', name: 'User 1', email: 'user1@example.com' },
      { id: '2', name: 'User 2', email: 'user2@example.com' },
    ];

    const { trpc } = await import('@/server/trpc/client');
    (trpc.users.list.useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockUsers,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useUsers(), {
      wrapper: createWrapper(),
    });

    expect(result.current.users).toEqual(mockUsers);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle loading state', async () => {
    const { trpc } = await import('@/server/trpc/client');
    (trpc.users.list.useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    const { result } = renderHook(() => useUsers(), {
      wrapper: createWrapper(),
    });

    expect(result.current.users).toEqual([]);
    expect(result.current.isLoading).toBe(true);
  });
});

describe('useUser Hook', () => {
  it('should return user data for given id', async () => {
    const mockUser = { id: '1', name: 'User 1', email: 'user1@example.com' };
    const { trpc } = await import('@/server/trpc/client');
    (trpc.users.getById.useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockUser,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useUser('1'), {
      wrapper: createWrapper(),
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isLoading).toBe(false);
  });
});
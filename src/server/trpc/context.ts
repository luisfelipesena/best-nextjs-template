import type { inferAsyncReturnType } from '@trpc/server';
import { headers } from 'next/headers';
import { auth } from '@/server/auth';
import { db } from '@/server/db';

export async function createContext() {
  const authContext = await auth.api.getSession({
    headers: await headers(),
  });

  return {
    db,
    auth: authContext,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;

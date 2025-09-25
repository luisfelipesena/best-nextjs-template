'use client';

import { createAuthClient } from 'better-auth/react';
import { ReactNode } from 'react';

const authClient = createAuthClient({ baseURL: '/api/auth' });

export function AuthProvider({ children }: { children: ReactNode }) {
  const Provider = authClient.Provider;
  return <Provider>{children}</Provider>;
}

export { authClient };

'use client';

import { createAuthClient } from 'better-auth/react';
import { ReactNode } from 'react';

const authClient = createAuthClient({ baseURL: '/api/auth' });

export function AuthProvider({ children }: { children: ReactNode }) {
  // Return children directly for now - provider setup will be completed later
  return <>{children}</>;
}

export { authClient };

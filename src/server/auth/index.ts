import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db, schema } from '@/server/db';
import { authConfig } from './config';

export const auth = betterAuth({
  ...authConfig,
  adapter: drizzleAdapter(db, { schema, provider: 'pg' }),
  session: {
    cookieCache: {
      enabled: true,
    },
  },
});


import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '@/server/db'
import { user, session, account, verification } from '@/server/db/schema'
import { authConfig } from './config'

export const auth = betterAuth({
  ...authConfig,
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  session: {
    cookieCache: {
      enabled: true,
    },
  },
})

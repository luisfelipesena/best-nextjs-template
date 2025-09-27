import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db, schema } from '@/server/db'
import { authConfig } from './config'

export const auth = betterAuth({
  ...authConfig,
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: schema,
  }),
  session: {
    cookieCache: {
      enabled: true,
    },
  },
})

import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

const nodeEnv = process.env.NODE_ENV

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    DATABASE_URL_TEST: z.string().url().optional(),
    BETTER_AUTH_SECRET: z.string().min(32),
    BETTER_AUTH_BASE_URL: z.string().url(),
    TRPC_API_URL: z.string().url().optional(),
  },
  client: {
    NEXT_PUBLIC_APP_NAME: z.string().default('Best Next.js Template'),
    NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_URL_TEST: process.env.DATABASE_URL_TEST,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_BASE_URL: process.env.BETTER_AUTH_BASE_URL,
    TRPC_API_URL: process.env.TRPC_API_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
  skipValidation: nodeEnv === 'production' || nodeEnv === 'test',
  emptyStringAsUndefined: true,
})

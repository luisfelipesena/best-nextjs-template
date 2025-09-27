import { env } from '@/config/env'

export const authConfig = {
  baseURL: env.BETTER_AUTH_BASE_URL,
  secret: env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Disable for development/testing
    autoSignIn: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 24 hours
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
  },
  trustedOrigins: [env.BETTER_AUTH_BASE_URL],
  rateLimit: {
    window: 60 * 1000, // 1 minute
    max: 10, // 10 requests per window
  },
}

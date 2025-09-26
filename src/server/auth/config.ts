import { env } from '@/config/env'

export const authConfig = {
  baseURL: env.BETTER_AUTH_BASE_URL,
  secret: env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Disable for development
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 24 hours
  },
  trustedOrigins: [env.BETTER_AUTH_BASE_URL],
}

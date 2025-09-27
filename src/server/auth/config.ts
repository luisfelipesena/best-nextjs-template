import { env } from '@/config/env'

// Get base URL with fallback
const getBaseURL = () => {
  try {
    return env.BETTER_AUTH_BASE_URL || 'http://localhost:3000'
  } catch {
    return 'http://localhost:3000'
  }
}

// Get secret with fallback
const getSecret = () => {
  try {
    return env.BETTER_AUTH_SECRET || 'fallback-secret-key-for-development-only-32-chars'
  } catch {
    return 'fallback-secret-key-for-development-only-32-chars'
  }
}

const baseURL = getBaseURL()

export const authConfig = {
  baseURL,
  secret: getSecret(),
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
  trustedOrigins: [baseURL],
  rateLimit: {
    window: 60 * 1000, // 1 minute
    max: 10, // 10 requests per window
  },
}

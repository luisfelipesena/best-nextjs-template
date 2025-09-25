import { env } from '@/config/env';

export const authConfig = {
  baseURL: env.BETTER_AUTH_BASE_URL || 'http://localhost:3000',
  secret: env.BETTER_AUTH_SECRET || 'fallback-secret-key-change-in-production',
};

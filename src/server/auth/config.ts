import { env } from '@/config/env';

export const authConfig = {
  baseURL: env.BETTER_AUTH_BASE_URL,
  secret: env.BETTER_AUTH_SECRET,
};

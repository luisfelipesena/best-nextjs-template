import { toNextJsHandler } from 'better-auth/next';
import { auth } from '@/server/auth';

export const { GET, POST } = toNextJsHandler(auth);

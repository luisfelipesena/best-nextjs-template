import { createTRPCRouter } from '../core';
import { authRoutes } from '@/server/routes/auth/auth.route';

export const appRouter = createTRPCRouter({
  auth: authRoutes,
});

export type AppRouter = typeof appRouter;


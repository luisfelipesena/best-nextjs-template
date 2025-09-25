import { createTRPCRouter } from '../core';
import { authRouter } from '@/server/routes/auth/auth.route';
import { usersRouter } from '@/server/routes/users/users.route';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  users: usersRouter,
});

export type AppRouter = typeof appRouter;


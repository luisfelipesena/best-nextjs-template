import { createTRPCRouter } from '../core'
import { authRouter } from '@/server/routes/auth/auth.route'

export const appRouter = createTRPCRouter({
  auth: authRouter,
})

export type AppRouter = typeof appRouter

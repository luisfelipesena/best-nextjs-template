import { createTRPCRouter } from '../core'
import { authRouter } from '@/server/routes/auth/auth.route'
import { dashboardRouter } from '@/server/routes/dashboard/dashboard.route'

export const appRouter = createTRPCRouter({
  auth: authRouter,
  dashboard: dashboardRouter,
})

export type AppRouter = typeof appRouter


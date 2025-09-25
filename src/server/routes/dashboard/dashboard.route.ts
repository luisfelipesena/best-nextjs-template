import { createTRPCRouter, protectedProcedure } from '@/server/trpc/core'
import { getStatsDto, getAnalyticsDto } from './dashboard.dto'
import { DashboardService } from './dashboard.service'

export const dashboardRouter = createTRPCRouter({
  stats: protectedProcedure
    .input(getStatsDto)
    .query(async ({ ctx, input }) => {
      const service = new DashboardService(ctx)
      return service.getStats(input)
    }),

  recentActivity: protectedProcedure.query(async ({ ctx }) => {
    const service = new DashboardService(ctx)
    return service.getRecentActivity()
  }),

  analytics: protectedProcedure
    .input(getAnalyticsDto)
    .query(async ({ ctx, input }) => {
      const service = new DashboardService(ctx)
      return service.getAnalytics(input)
    }),
})
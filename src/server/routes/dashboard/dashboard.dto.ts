import { z } from 'zod'

// Dashboard DTOs
export const getStatsDto = z.object({
  period: z.enum(['7d', '30d', '90d', '1y']).optional().default('30d'),
})

export const getAnalyticsDto = z.object({
  startDate: z.date(),
  endDate: z.date(),
  metrics: z.array(z.enum(['users', 'revenue', 'orders', 'sessions'])).optional(),
})

// Types
export type GetStatsDto = z.infer<typeof getStatsDto>
export type GetAnalyticsDto = z.infer<typeof getAnalyticsDto>
'use client'

import { trpc } from '@/server/trpc/client'

interface UseDashboardOptions {
  period?: '7d' | '30d' | '90d' | '1y'
  enabled?: boolean
}

export function useDashboard(options: UseDashboardOptions = {}) {
  const { period = '30d', enabled = true } = options

  const statsQuery = trpc.dashboard.stats.useQuery(
    { period },
    { enabled }
  )

  const recentActivityQuery = trpc.dashboard.recentActivity.useQuery(
    undefined,
    { enabled }
  )

  const analyticsQuery = trpc.dashboard.analytics.useQuery(
    {
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      endDate: new Date(),
    },
    { enabled }
  )

  return {
    // Stats data
    stats: statsQuery.data,
    isStatsLoading: statsQuery.isLoading,
    statsError: statsQuery.error,

    // Recent activity data
    recentActivity: recentActivityQuery.data || [],
    isRecentActivityLoading: recentActivityQuery.isLoading,
    recentActivityError: recentActivityQuery.error,

    // Analytics data
    analytics: analyticsQuery.data,
    isAnalyticsLoading: analyticsQuery.isLoading,
    analyticsError: analyticsQuery.error,

    // Refetch functions
    refetchStats: statsQuery.refetch,
    refetchRecentActivity: recentActivityQuery.refetch,
    refetchAnalytics: analyticsQuery.refetch,

    // Combined loading state
    isLoading: statsQuery.isLoading || recentActivityQuery.isLoading || analyticsQuery.isLoading,

    // Combined error state
    hasError: !!statsQuery.error || !!recentActivityQuery.error || !!analyticsQuery.error,
  }
}
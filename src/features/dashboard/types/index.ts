export interface DashboardStat {
  title: string
  value: string | number
  description?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
}

export interface DashboardData {
  stats: DashboardStat[]
  recentActivity: Activity[]
}

export interface Activity {
  id: string
  type: 'user_registered' | 'order_created' | 'payment_received'
  description: string
  timestamp: Date
  userId?: string
}
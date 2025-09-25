'use client'

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
}

function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <div className='rounded-lg border bg-card p-6 text-card-foreground shadow-sm'>
      <div className='flex items-center justify-between space-y-0 pb-2'>
        <h3 className='text-sm font-medium tracking-tight'>{title}</h3>
        {icon && <div className='h-4 w-4 text-muted-foreground'>{icon}</div>}
      </div>
      <div className='space-y-1'>
        <div className='text-2xl font-bold'>{value}</div>
        {description && (
          <p className='text-xs text-muted-foreground'>{description}</p>
        )}
      </div>
    </div>
  )
}

export function DashboardStats() {
  // TODO: Fetch real data via TRPC
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      description: '+20.1% from last month',
    },
    {
      title: 'Active Sessions',
      value: '573',
      description: '+180.1% from last month',
    },
    {
      title: 'Revenue',
      value: '$15,231',
      description: '+19% from last month',
    },
    {
      title: 'Growth',
      value: '+12.5%',
      description: '+4.5% from last month',
    },
  ]

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}
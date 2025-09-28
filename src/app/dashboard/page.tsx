import { redirect } from 'next/navigation'
import { auth } from '@/server/auth'
import { headers } from 'next/headers'
import { DashboardLayout } from '@/components/dashboard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, Users, ShoppingCart, TrendingUp } from 'lucide-react'

export default async function DashboardPage() {
  // Check authentication on server side
  const sessionData = await auth.api.getSession({
    headers: await headers(),
  })

  if (!sessionData?.user) {
    redirect('/login')
  }

  const stats = [
    {
      title: 'Total de Usuários',
      value: '2,540',
      change: '+12%',
      icon: Users,
    },
    {
      title: 'Vendas',
      value: 'R$ 45,231',
      change: '+8%',
      icon: ShoppingCart,
    },
    {
      title: 'Conversão',
      value: '12.5%',
      change: '+2.1%',
      icon: TrendingUp,
    },
    {
      title: 'Atividade',
      value: '573',
      change: '+23%',
      icon: Activity,
    },
  ]

  return (
    <DashboardLayout>
      <div className='space-y-6'>
        {/* Header */}
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
          <p className='text-muted-foreground'>
            Bem-vindo ao seu dashboard, {sessionData.user.name}! Você está autenticado.
          </p>
        </div>

        {/* Stats Cards */}
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title}>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>{stat.title}</CardTitle>
                  <Icon className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{stat.value}</div>
                  <p className='text-xs text-muted-foreground'>
                    <span className='text-green-600'>{stat.change}</span> from last month
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Main Content Grid */}
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          <Card className='col-span-full lg:col-span-2'>
            <CardHeader>
              <CardTitle>Visão Geral</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='h-[300px] flex items-center justify-center bg-muted/30 rounded'>
                <p className='text-muted-foreground'>Gráfico de atividade aqui</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {[
                'Novo usuário cadastrado',
                'Pedido #1234 finalizado',
                'Configuração atualizada',
                'Backup realizado',
              ].map((activity, index) => (
                <div key={index} className='flex items-center space-x-3'>
                  <div className='h-2 w-2 bg-primary rounded-full' />
                  <p className='text-sm'>{activity}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          <Card>
            <CardHeader>
              <CardTitle>Perfil</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground mb-4'>Gerencie suas informações pessoais</p>
              <div className='space-y-2'>
                <p className='text-sm'>
                  <strong>Nome:</strong> {sessionData.user.name}
                </p>
                <p className='text-sm'>
                  <strong>Email:</strong> {sessionData.user.email}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configurações</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>Ajuste suas preferências e configurações da conta</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Suporte</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground'>Precisa de ajuda? Entre em contato com nosso suporte</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Home, User, Settings, Activity, ShoppingCart, BarChart3, LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Perfil', href: '/dashboard/profile', icon: User },
  { name: 'Atividade', href: '/dashboard/activity', icon: Activity },
  { name: 'Pedidos', href: '/dashboard/orders', icon: ShoppingCart },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Configurações', href: '/dashboard/settings', icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { signOut, user } = useAuth()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className='flex items-center space-x-2 px-4 py-2'>
          <SidebarTrigger />
          <Link href='/dashboard' className='flex items-center space-x-2'>
            <div className='h-8 w-8 bg-primary rounded-lg flex items-center justify-center'>
              <span className='text-primary-foreground font-bold text-sm'>A</span>
            </div>
            <span className='font-semibold'>Dashboard</span>
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.href}>
                        <Icon className='h-4 w-4' />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className='p-4 space-y-3'>
          <div className='flex items-center space-x-3 p-3 rounded-lg bg-sidebar-accent'>
            <div className='h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center'>
              <User className='h-4 w-4' />
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium truncate'>{user?.name}</p>
              <p className='text-xs text-muted-foreground truncate'>{user?.email}</p>
            </div>
          </div>

          <Button variant='ghost' size='sm' className='w-full justify-start' onClick={() => signOut.email()}>
            <LogOut className='h-4 w-4 mr-2' />
            Sair
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

// Keep the old export for backward compatibility
export { AppSidebar as Sidebar }

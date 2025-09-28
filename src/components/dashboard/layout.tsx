'use client'

import { AppSidebar } from './sidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className='flex flex-1 flex-col gap-4 p-4'>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}

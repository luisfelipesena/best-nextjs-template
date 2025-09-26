'use client'

import { AuthStatus } from '@/features/auth'
import { AppShell } from '@/components/layout/app-shell'
import { ProtectedRoute } from '@/components/auth/protected-route'

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <AppShell header={<AuthStatus />}>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Bem-vindo ao seu dashboard! Você está autenticado.
            </p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold">Perfil</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Gerencie suas informações pessoais
              </p>
            </div>
            
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold">Configurações</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Ajuste suas preferências
              </p>
            </div>
            
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold">Atividade</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Veja sua atividade recente
              </p>
            </div>
          </div>
        </div>
      </AppShell>
    </ProtectedRoute>
  )
}
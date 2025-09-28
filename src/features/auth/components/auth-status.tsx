'use client'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'

export function AuthStatus() {
  const { isLoading, isAuthenticated, signOut, user } = useAuth()

  if (isLoading) {
    return (
      <span className='text-sm text-muted-foreground' data-testid='auth-status'>
        Carregando...
      </span>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className='flex gap-2' data-testid='auth-status'>
        <Button asChild variant='ghost'>
          <Link href='/login'>Entrar</Link>
        </Button>
        <Button asChild variant='default'>
          <Link href='/register'>Cadastrar</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className='flex items-center gap-3 text-sm' data-testid='auth-status'>
      <div className='flex flex-col text-left'>
        <span className='font-medium'>{user?.name}</span>
        <span className='text-xs text-muted-foreground'>{user?.email}</span>
      </div>
      <Button variant='ghost' onClick={() => signOut.email()}>
        Sair
      </Button>
    </div>
  )
}

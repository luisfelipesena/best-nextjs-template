'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  const router = useRouter()

  const handleGoBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-background'>
      <div className='text-center space-y-6 max-w-md mx-auto px-4'>
        {/* 404 Illustration */}
        <div className='relative'>
          <h1 className='text-8xl font-bold text-muted-foreground/20 select-none'>404</h1>
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='bg-primary/10 rounded-full p-6'>
              <div className='text-6xl'>🔍</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='space-y-4'>
          <h2 className='text-2xl font-bold text-foreground'>Página não encontrada</h2>
          <p className='text-muted-foreground text-lg'>
            Oops! A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        {/* Actions */}
        <div className='flex flex-col sm:flex-row gap-3 justify-center'>
          <Button onClick={handleGoBack} variant='default' className='flex items-center gap-2'>
            <ArrowLeft className='h-4 w-4' />
            Voltar
          </Button>

          <Button asChild variant='outline' className='flex items-center gap-2'>
            <Link href='/'>
              <Home className='h-4 w-4' />
              Ir para o início
            </Link>
          </Button>
        </div>

        {/* Help text */}
        <div className='pt-6 border-t'>
          <p className='text-sm text-muted-foreground'>
            Se você acredita que isso é um erro, entre em contato com nosso suporte.
          </p>
        </div>
      </div>
    </div>
  )
}

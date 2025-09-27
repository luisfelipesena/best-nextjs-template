'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema, type LoginInput } from '../types'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'
import { useState } from 'react'

export function LoginForm() {
  const [generalError, setGeneralError] = useState<string>('')
  const router = useRouter()
  const { signIn } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginInput) => {
    setGeneralError('')

    try {
      // Sign in with Better Auth
      const result = await signIn.email({
        email: data.email,
        password: data.password,
      })

      if (result.error) {
        setGeneralError(result.error.message)
      } else {
        // Redirect on success
        router.push('/dashboard')
      }
    } catch {
      setGeneralError('Erro ao fazer login. Tente novamente.')
    }
  }

  return (
    <div className='mx-auto max-w-sm space-y-6'>
      <div className='space-y-2 text-center'>
        <h1 className='text-3xl font-bold'>Login</h1>
        <p className='text-gray-500 dark:text-gray-400'>Entre com suas credenciais</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        {generalError && (
          <div className='rounded-md bg-red-50 p-3'>
            <p className='text-sm text-red-500'>{generalError}</p>
          </div>
        )}

        <div className='space-y-2'>
          <label htmlFor='email' className='text-sm font-medium'>
            Email
          </label>
          <Input
            id='email'
            type='email'
            {...register('email')}
            placeholder='seu@email.com'
          />
          {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
        </div>

        <div className='space-y-2'>
          <label htmlFor='password' className='text-sm font-medium'>
            Senha
          </label>
          <Input
            id='password'
            type='password'
            {...register('password')}
            placeholder='••••••••'
          />
          {errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}
        </div>

        <Button type='submit' className='w-full' disabled={isSubmitting}>
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>

      <div className='text-center'>
        <p className='text-sm text-muted-foreground'>
          Não tem uma conta?{' '}
          <Link href='/register' className='font-medium text-primary hover:underline'>
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}

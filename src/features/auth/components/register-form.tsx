'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterSchema, type RegisterInput } from '../types'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'
import { useState } from 'react'

export function RegisterForm() {
  const [generalError, setGeneralError] = useState<string>('')
  const router = useRouter()
  const { signUp } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: RegisterInput) => {
    setGeneralError('')

    try {
      // Sign up with Better Auth
      const result = await signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
      })

      if (result.error) {
        setGeneralError(result.error.message)
      } else {
        // Redirect on success
        router.push('/dashboard')
      }
    } catch {
      setGeneralError('Erro ao criar conta. Tente novamente.')
    }
  }

  return (
    <div className='mx-auto max-w-sm space-y-6'>
      <div className='space-y-2 text-center'>
        <h1 className='text-3xl font-bold'>Cadastro</h1>
        <p className='text-gray-500 dark:text-gray-400'>Crie sua conta para continuar</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        {generalError && (
          <div className='rounded-md bg-red-50 p-3'>
            <p className='text-sm text-red-500'>{generalError}</p>
          </div>
        )}

        <div className='space-y-2'>
          <label htmlFor='name' className='text-sm font-medium'>
            Nome
          </label>
          <Input
            id='name'
            type='text'
            {...register('name')}
            placeholder='Seu nome completo'
          />
          {errors.name && <p className='text-sm text-red-500'>{errors.name.message}</p>}
        </div>

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

        <div className='space-y-2'>
          <label htmlFor='confirmPassword' className='text-sm font-medium'>
            Confirmar Senha
          </label>
          <Input
            id='confirmPassword'
            type='password'
            {...register('confirmPassword')}
            placeholder='••••••••'
          />
          {errors.confirmPassword && <p className='text-sm text-red-500'>{errors.confirmPassword.message}</p>}
        </div>

        <Button type='submit' className='w-full' disabled={isSubmitting}>
          {isSubmitting ? 'Criando conta...' : 'Criar conta'}
        </Button>
      </form>

      <div className='text-center'>
        <p className='text-sm text-muted-foreground'>
          Já tem uma conta?{' '}
          <Link href='/login' className='font-medium text-primary hover:underline'>
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  )
}

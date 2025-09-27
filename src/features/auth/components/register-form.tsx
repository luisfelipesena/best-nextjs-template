'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { RegisterSchema, type RegisterInput } from '../types'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'

export function RegisterForm() {
  const [formData, setFormData] = useState<RegisterInput>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    try {
      // Validate with Zod
      const validatedData = RegisterSchema.parse(formData)

      // Sign up with Better Auth
      const result = await signUp.email({
        email: validatedData.email,
        password: validatedData.password,
        name: validatedData.name,
      })

      if (result.error) {
        setErrors({ general: result.error.message })
      } else {
        // Redirect on success
        router.push('/dashboard')
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        for (const err of error.issues) {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message
          }
        }
        setErrors(fieldErrors)
      } else {
        setErrors({ general: 'Erro ao criar conta. Tente novamente.' })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: keyof RegisterInput) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className='mx-auto max-w-sm space-y-6'>
      <div className='space-y-2 text-center'>
        <h1 className='text-3xl font-bold'>Cadastro</h1>
        <p className='text-gray-500 dark:text-gray-400'>Crie sua conta para continuar</p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-4'>
        {errors.general && (
          <div className='rounded-md bg-red-50 p-3'>
            <p className='text-sm text-red-500'>{errors.general}</p>
          </div>
        )}

        <div className='space-y-2'>
          <label htmlFor='name' className='text-sm font-medium'>
            Nome
          </label>
          <input
            id='name'
            type='text'
            value={formData.name}
            onChange={handleChange('name')}
            className='w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
            placeholder='Seu nome completo'
          />
          {errors.name && <p className='text-sm text-red-500'>{errors.name}</p>}
        </div>

        <div className='space-y-2'>
          <label htmlFor='email' className='text-sm font-medium'>
            Email
          </label>
          <input
            id='email'
            type='email'
            value={formData.email}
            onChange={handleChange('email')}
            className='w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
            placeholder='seu@email.com'
          />
          {errors.email && <p className='text-sm text-red-500'>{errors.email}</p>}
        </div>

        <div className='space-y-2'>
          <label htmlFor='password' className='text-sm font-medium'>
            Senha
          </label>
          <input
            id='password'
            type='password'
            value={formData.password}
            onChange={handleChange('password')}
            className='w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
            placeholder='••••••••'
          />
          {errors.password && <p className='text-sm text-red-500'>{errors.password}</p>}
        </div>

        <div className='space-y-2'>
          <label htmlFor='confirmPassword' className='text-sm font-medium'>
            Confirmar Senha
          </label>
          <input
            id='confirmPassword'
            type='password'
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
            className='w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
            placeholder='••••••••'
          />
          {errors.confirmPassword && <p className='text-sm text-red-500'>{errors.confirmPassword}</p>}
        </div>

        <Button type='submit' className='w-full' disabled={isLoading}>
          {isLoading ? 'Criando conta...' : 'Criar conta'}
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

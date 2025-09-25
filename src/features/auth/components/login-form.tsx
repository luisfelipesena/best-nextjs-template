'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { LoginSchema, type LoginInput } from '../types'

export function LoginForm() {
  const [formData, setFormData] = useState<LoginInput>({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    try {
      // Validate with Zod
      const validatedData = LoginSchema.parse(formData)
      
      // TODO: Implement auth login via TRPC
      console.log('Login data:', validatedData)
      
      // Redirect on success
      router.push('/dashboard')
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        for (const err of error.issues) {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message
          }
        }
        setErrors(fieldErrors)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: keyof LoginInput) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className='mx-auto max-w-sm space-y-6'>
      <div className='space-y-2 text-center'>
        <h1 className='text-3xl font-bold'>Login</h1>
        <p className='text-gray-500 dark:text-gray-400'>
          Entre com suas credenciais
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className='space-y-4'>
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
          {errors.email && (
            <p className='text-sm text-red-500'>{errors.email}</p>
          )}
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
          {errors.password && (
            <p className='text-sm text-red-500'>{errors.password}</p>
          )}
        </div>
        
        <Button type='submit' className='w-full' disabled={isLoading}>
          {isLoading ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
    </div>
  )
}
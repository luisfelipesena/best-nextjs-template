'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RegisterSchema, type RegisterInput } from '../types'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [generalError, setGeneralError] = useState('')
  const router = useRouter()
  const { signUp } = useAuth()

  const form = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true)
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
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className='mx-auto max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>Cadastro</CardTitle>
        <CardDescription>Crie sua conta para continuar</CardDescription>
        <div className='mt-2 text-center'>
          <Link href='/' className='text-sm text-muted-foreground hover:text-foreground transition-colors'>
            ← Voltar para a página inicial
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            {generalError && (
              <div className='rounded-md bg-red-50 p-3'>
                <p className='text-sm text-red-500'>{generalError}</p>
              </div>
            )}

            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder='Seu nome completo' {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='seu@email.com' {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='••••••••' {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Senha</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='••••••••' {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? 'Criando conta...' : 'Criar conta'}
            </Button>
          </form>
        </Form>

        <div className='mt-4 text-center text-sm'>
          Já tem uma conta?{' '}
          <Link href='/login' className='underline'>
            Fazer login
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

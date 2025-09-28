'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { LoginSchema, type LoginInput } from '../types'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [generalError, setGeneralError] = useState('')
  const router = useRouter()
  const { signIn } = useAuth()

  const form = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true)
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
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className='mx-auto max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>Login</CardTitle>
        <CardDescription>Entre com suas credenciais para acessar sua conta</CardDescription>
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

            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </Form>

        <div className='mt-4 text-center text-sm'>
          Não tem uma conta?{' '}
          <Link href='/register' className='underline'>
            Cadastre-se
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

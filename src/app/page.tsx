'use client'

import Link from 'next/link'
import { AppShell } from '@/components/layout/app-shell'
import { AuthStatus } from '@/features/auth'

export default function Home() {
  return (
    <AppShell header={<AuthStatus />}>
      <section className='mx-auto flex max-w-3xl flex-col gap-4 text-center'>
        <p className='text-sm uppercase tracking-[0.3em] text-muted-foreground'>Best Next.js Template</p>
        <h1 className='text-balance text-4xl font-semibold sm:text-5xl'>
          Comece sua próxima aplicação full-stack com padrões seniores opinativos.
        </h1>
        <p className='text-pretty text-lg text-muted-foreground'>
          Arquitetura file-based para front e back, TRPC, TanStack Query, Drizzle, Better Auth, testes Vitest e
          Playwright — tudo pronto.
        </p>
      </section>

      <section className='mx-auto grid w-full max-w-4xl gap-4 sm:grid-cols-2'>
        <Link
          href='/docs/overview'
          className='rounded-xl border border-border bg-card p-6 text-left transition hover:border-primary'
        >
          <h2 className='text-xl font-semibold'>Documentação</h2>
          <p className='mt-2 text-sm text-muted-foreground'>
            Leia sobre convenções, camadas, fluxo de dados e como contribuir mantendo legibilidade.
          </p>
        </Link>

        <Link
          href='/playground'
          className='rounded-xl border border-border bg-card p-6 text-left transition hover:border-primary'
        >
          <h2 className='text-xl font-semibold'>Playground</h2>
          <p className='mt-2 text-sm text-muted-foreground'>
            Veja exemplos de features completas com hooks, componentes e rotas backend.
          </p>
        </Link>
      </section>

      <section className='mx-auto flex w-full max-w-3xl flex-col gap-2 text-center'>
        <span className='text-xs text-muted-foreground'>workflow</span>
        <p className='text-balance text-sm text-muted-foreground'>
          CI roda lint, typecheck, build, Vitest e Playwright e2e com banco isolado — nenhum dado de produção é afetado.
        </p>
      </section>
    </AppShell>
  )
}

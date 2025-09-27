import { ReactNode } from 'react'

export function AppShell({ header, children }: { header: ReactNode; children: ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col bg-background text-foreground'>
      <header className='border-b border-border bg-card'>
        <div className='mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4'>{header}</div>
      </header>
      <main className='mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-10'>{children}</main>
    </div>
  )
}

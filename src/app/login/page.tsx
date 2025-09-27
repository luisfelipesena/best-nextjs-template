import { LoginForm } from '@/features/auth'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-background'>
      <div className='w-full max-w-md space-y-8'>
        <div className='text-center'>
          <Link href='/' className='text-2xl font-bold text-primary'>
            Best Next.js Template
          </Link>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

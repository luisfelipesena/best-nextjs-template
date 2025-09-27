import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('session')

  if (sessionToken?.value === 'mock-session-token') {
    return NextResponse.json({
      session: {
        id: 'mock-session-id',
        userId: 'mock-user-id',
        expiresAt: new Date(Date.now() + 86400000), // 24 hours
      },
      user: {
        id: 'mock-user-id',
        name: 'Test User',
        email: 'test@example.com',
      },
    })
  }

  return NextResponse.json({ session: null, user: null })
}

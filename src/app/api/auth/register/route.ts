import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email } = registerSchema.parse(body)

    // Mock registration - in real app, this would save to database
    // For E2E tests, just simulate successful registration
    const cookieStore = await cookies()

    // Set session cookie
    cookieStore.set('session', 'mock-session-token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400, // 24 hours
    })

    return NextResponse.json({
      success: true,
      user: {
        id: 'mock-user-id',
        name,
        email,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.issues }, { status: 400 })
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

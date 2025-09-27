import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/server/auth'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = registerSchema.parse(body)

    // Use Better Auth for registration
    const result = await auth.api.signUpEmail({
      body: { name, email, password },
      headers: request.headers,
    })

    // Check if result has user (success case)
    if (result.user) {
      return NextResponse.json({
        success: true,
        user: result.user,
      })
    }

    // If no user, it's an error
    return NextResponse.json({ error: 'Registration failed' }, { status: 400 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.issues }, { status: 400 })
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

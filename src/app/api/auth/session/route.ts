import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/server/auth'
import { headers } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    // Get session from Better Auth
    const sessionData = await auth.api.getSession({
      headers: await headers(),
    })

    if (sessionData?.session && sessionData?.user) {
      return NextResponse.json({
        session: sessionData.session,
        user: sessionData.user,
      })
    }

    return NextResponse.json({ session: null, user: null })
  } catch (error) {
    console.error('Error getting session:', error)
    return NextResponse.json({ session: null, user: null })
  }
}

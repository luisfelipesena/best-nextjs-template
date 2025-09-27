import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/server/auth'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    // Use Better Auth to sign out
    await auth.api.signOut({
      headers: await headers(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error during logout:', error)
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 })
  }
}

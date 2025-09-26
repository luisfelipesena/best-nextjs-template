import { NextRequest, NextResponse } from 'next/server'

// Mock auth endpoints for template - in real app, this would use Better Auth
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')
  
  // Mock session endpoint
  if (action === 'session') {
    return NextResponse.json({ session: null, user: null })
  }
  
  return NextResponse.json({ message: 'Auth endpoint - Better Auth integration pending' })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  // Mock login/register endpoints
  if (body.email && body.password) {
    // In real app, this would authenticate with Better Auth
    return NextResponse.json({ 
      user: { id: '1', email: body.email, name: body.name || 'User' },
      session: { id: 'mock-session', expiresAt: new Date(Date.now() + 86400000) }
    })
  }
  
  return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 })
}

import { NextResponse } from 'next/server'

// TODO: Implement Better Auth properly
// For now, create placeholder handlers

export async function GET() {
  return NextResponse.json({ message: 'Auth GET endpoint - TODO: implement Better Auth' })
}

export async function POST() {
  return NextResponse.json({ message: 'Auth POST endpoint - TODO: implement Better Auth' })
}

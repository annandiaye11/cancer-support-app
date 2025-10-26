import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

export const dynamic = 'force-static'
export const revalidate = false

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email requis' },
        { status: 400 }
      )
    }
    
    // Chercher si l'utilisateur existe
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    
    return NextResponse.json({
      exists: !!existingUser,
      user: existingUser ? {
        name: existingUser.name,
        email: existingUser.email
      } : null
    })
    
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'email:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

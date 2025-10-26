import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const dynamic = 'force-static'
export const revalidate = false

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const { email, password } = await request.json()
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      )
    }
    
    // Chercher l'utilisateur par email et inclure explicitement le mot de passe
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password')
    
    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 401 }
      )
    }
    
    // Vérifier que l'utilisateur a un mot de passe
    if (!user.password) {
      return NextResponse.json(
        { error: 'Compte sans mot de passe. Veuillez contacter le support.' },
        { status: 401 }
      )
    }
    
    // Vérifier le mot de passe
    const isValidPassword = await bcrypt.compare(password, user.password)
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Mot de passe incorrect' },
        { status: 401 }
      )
    }
    
    // Générer un token JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    )
    
    // Mettre à jour la dernière connexion
    await User.findByIdAndUpdate(user._id, {
      lastLogin: new Date()
    })
    
    // Retourner les données utilisateur complètes (sans le mot de passe)
    const userProfile = {
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      gender: user.profile.gender,
      mode: user.profile.mode,
      age: user.profile.age,
      avatar: user.avatar,
      profile: {
        gender: user.profile.gender,
        age: user.profile.age,
        mode: user.profile.mode,
        medicalHistory: user.profile.medicalHistory || [],
        allergies: user.profile.allergies || [],
        currentTreatments: user.profile.currentTreatments || []
      },
      preferences: user.preferences,
      createdAt: user.createdAt,
      lastLogin: new Date()
    }
    
    return NextResponse.json({
      success: true,
      user: userProfile,
      token
    })
    
  } catch (error) {
    console.error('Erreur lors de la connexion:', error)
    return NextResponse.json(
      { error: 'Erreur serveur lors de la connexion' },
      { status: 500 }
    )
  }
}

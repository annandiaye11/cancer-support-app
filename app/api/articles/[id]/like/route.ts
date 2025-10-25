import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Article from '@/models/Article'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const { id } = params
    
    // Incrémenter le compteur de likes
    const article = await Article.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    )
    
    if (!article) {
      return NextResponse.json(
        { error: 'Article non trouvé' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ 
      message: 'Like enregistré',
      likes: article.likes 
    })
  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout du like:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'ajout du like' },
      { status: 500 }
    )
  }
}

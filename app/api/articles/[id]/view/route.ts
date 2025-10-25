import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Article from '@/models/Article'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const { id } = await params
    
    // Incrémenter le compteur de vues
    const article = await Article.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    )
    
    if (!article) {
      return NextResponse.json(
        { error: 'Article non trouvé' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ 
      message: 'Vue enregistrée',
      views: article.views 
    })
  } catch (error) {
    console.error('❌ Erreur lors de l\'incrémentation des vues:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'incrémentation des vues' },
      { status: 500 }
    )
  }
}

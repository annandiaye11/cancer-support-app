import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Article from '@/models/Article'

// GET /api/articles - Récupérer tous les articles
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')

    // Construire le filtre MongoDB
    const filter: any = { isPublished: true }

    // Filtrer par catégorie
    if (category) {
      filter.category = category
    }

    // Filtrer par featured
    if (featured === 'true') {
      filter.isFeatured = true
    }

    // Filtrer par recherche (titre, slug, excerpt, tags)
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { slug: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ]
    }

    // Compter le total
    const total = await Article.countDocuments(filter)

    // Récupérer les articles avec pagination
    const articles = await Article.find(filter)
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select('-content') // Exclure le contenu pour la liste
      .lean()

    // Calculer les métadonnées de pagination
    const totalPages = Math.ceil(total / limit)
    const hasNext = page < totalPages
    const hasPrev = page > 1

    return NextResponse.json({
      articles,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext,
        hasPrev
      }
    })
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// POST /api/articles - Créer un nouvel article
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Pour cette version temporaire, on ne peut pas créer d'articles
    return NextResponse.json(
      { error: 'Création d\'articles non disponible en mode temporaire' },
      { status: 501 }
    )
  } catch (error) {
    console.error('Erreur lors de la création de l\'article:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

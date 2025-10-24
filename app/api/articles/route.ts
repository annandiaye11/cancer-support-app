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
    
    let query: any = { isPublished: true }
    
    if (category) {
      query.category = category
    }
    
    if (featured === 'true') {
      query.isFeatured = true
    }
    
    if (search) {
      query.$text = { $search: search }
    }
    
    const articles = await Article.find(query)
      .sort(search ? { score: { $meta: 'textScore' } } : { publishedAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
    
    const total = await Article.countDocuments(query)
    
    return NextResponse.json({
      articles,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des articles' },
      { status: 500 }
    )
  }
}

// POST /api/articles - Créer un nouvel article
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    
    // Générer le slug à partir du titre
    const slug = body.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    
    // Vérifier si le slug existe déjà
    const existingArticle = await Article.findOne({ slug })
    if (existingArticle) {
      return NextResponse.json(
        { error: 'Un article avec ce titre existe déjà' },
        { status: 400 }
      )
    }
    
    const article = new Article({
      ...body,
      slug,
      publishedAt: body.isPublished ? new Date() : undefined
    })
    
    await article.save()
    
    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de l\'article' },
      { status: 500 }
    )
  }
}

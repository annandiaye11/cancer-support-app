import { NextRequest, NextResponse } from 'next/server'
// Données statiques temporaires
const TEMP_ARTICLES = [
  {
    _id: "1",
    title: "Les 10 habitudes pour réduire les risques de cancer",
    slug: "10-habitudes-reduire-risques-cancer",
    content: `<h2>Les 10 habitudes pour réduire les risques de cancer</h2>...`,
    excerpt: "Découvrez les 10 habitudes essentielles pour réduire significativement vos risques de développer un cancer.",
    category: "Prévention",
    tags: ["prévention", "habitudes", "santé", "style de vie"],
    author: {
      name: "Dr. Sophie Blanc",
      role: "Oncologue",
      avatar: "/placeholder-user.jpg"
    },
    image: "/healthy-lifestyle-prevention.jpg",
    readTime: 8,
    isPublished: true,
    isFeatured: true,
    views: 1250,
    likes: 89,
    publishedAt: new Date().toISOString(),
    seo: {
      metaTitle: "10 habitudes pour prévenir le cancer | CareCompanion",
      metaDescription: "Découvrez les habitudes scientifiquement prouvées pour réduire vos risques de cancer. Guide complet par nos experts.",
      keywords: ["prévention cancer", "habitudes santé", "réduire risques cancer"]
    }
  },
  {
    _id: "2",
    title: "Comprendre la mammographie : guide complet",
    slug: "comprendre-mammographie-guide-complet",
    content: `<h2>Comprendre la mammographie</h2>...`,
    excerpt: "Tout ce que vous devez savoir sur la mammographie : préparation, déroulement et interprétation des résultats.",
    category: "Dépistage",
    tags: ["mammographie", "dépistage", "cancer du sein"],
    author: {
      name: "Dr. Marie Dubois",
      role: "Radiologue",
      avatar: "/placeholder-user.jpg"
    },
    image: "/medical-screening-checkup.jpg",
    readTime: 6,
    isPublished: true,
    isFeatured: false,
    views: 890,
    likes: 67,
    publishedAt: new Date().toISOString()
  },
  {
    _id: "3", 
    title: "Nutrition et prévention du cancer",
    slug: "nutrition-prevention-cancer",
    content: `<h2>Nutrition et prévention du cancer</h2>...`,
    excerpt: "Découvrez comment une alimentation équilibrée peut vous aider à prévenir certains types de cancer.",
    category: "Nutrition",
    tags: ["nutrition", "alimentation", "prévention"],
    author: {
      name: "Nutritionniste Claire Martin",
      role: "Nutritionniste",
      avatar: "/placeholder-user.jpg"
    },
    image: "/healthy-food-nutrition.png",
    readTime: 10,
    isPublished: true,
    isFeatured: true,
    views: 1450,
    likes: 112,
    publishedAt: new Date().toISOString()
  },
  {
    _id: "4",
    title: "Gestion du stress pendant le traitement",
    slug: "gestion-stress-traitement",
    content: `<h2>Gestion du stress pendant le traitement</h2>...`,
    excerpt: "Techniques et conseils pour mieux gérer le stress et l'anxiété pendant un traitement contre le cancer.",
    category: "Bien-être",
    tags: ["stress", "traitement", "bien-être", "psychologie"],
    author: {
      name: "Dr. Pierre Moreau",
      role: "Psycho-oncologue",
      avatar: "/placeholder-user.jpg"
    },
    image: "/person-resting-peaceful.jpg",
    readTime: 7,
    isPublished: true,
    isFeatured: false,
    views: 756,
    likes: 43,
    publishedAt: new Date().toISOString()
  },
  {
    _id: "5",
    title: "L'importance de l'activité physique",
    slug: "importance-activite-physique",
    content: `<h2>L'importance de l'activité physique</h2>...`,
    excerpt: "Comment l'exercice physique peut contribuer à la prévention et à la récupération.",
    category: "Prévention",
    tags: ["exercice", "sport", "prévention", "récupération"],
    author: {
      name: "Coach Sarah Dupont",
      role: "Coach sportif spécialisé",
      avatar: "/placeholder-user.jpg"
    },
    image: "/people-exercising-outdoor.jpg",
    readTime: 5,
    isPublished: true,
    isFeatured: false,
    views: 623,
    likes: 38,
    publishedAt: new Date().toISOString()
  }
]

// GET /api/articles - Récupérer tous les articles
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')

    let filteredArticles = [...TEMP_ARTICLES]

    // Filtrer par catégorie
    if (category) {
      filteredArticles = filteredArticles.filter(article => article.category === category)
    }

    // Filtrer par featured
    if (featured === 'true') {
      filteredArticles = filteredArticles.filter(article => article.isFeatured)
    }

    // Filtrer par recherche
    if (search) {
      const searchLower = search.toLowerCase()
      filteredArticles = filteredArticles.filter(article =>
        article.title.toLowerCase().includes(searchLower) ||
        article.excerpt.toLowerCase().includes(searchLower) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedArticles = filteredArticles.slice(startIndex, endIndex)

    // Calculer les métadonnées de pagination
    const total = filteredArticles.length
    const totalPages = Math.ceil(total / limit)
    const hasNext = page < totalPages
    const hasPrev = page > 1

    return NextResponse.json({
      data: paginatedArticles,
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

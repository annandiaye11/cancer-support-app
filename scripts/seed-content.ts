import { config } from 'dotenv'
import mongoose from 'mongoose'
import Article from '../models/Article'
import Video from '../models/Video'

// Charger les variables d'environnement
config({ path: '.env.local' })

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI non défini dans .env.local')
}

// Données des articles
const articles = [
  {
    title: "Guide complet de l'auto-examen des seins",
    slug: "guide-auto-examen-seins",
    excerpt: "Apprenez les bonnes techniques pour effectuer un auto-examen des seins efficace.",
    content: "L'auto-examen des seins est une pratique importante...",
    category: "Prévention",
    tags: ["auto-examen", "seins", "prévention", "dépistage"],
    image: "/medical-screening-checkup.jpg",
    author: {
      name: "Dr. Sophie Martin",
      role: "Gynécologue",
      avatar: "/placeholder-user.jpg"
    },
    isPublished: true,
    isFeatured: true,
    readTime: 8,
    views: 2345,
    likes: 189,
    publishedAt: new Date('2024-10-20'),
    seo: {
      metaTitle: "Guide complet de l'auto-examen des seins",
      metaDescription: "Apprenez les techniques d'auto-examen des seins",
      keywords: ["auto-examen", "seins", "prévention"]
    }
  },
  {
    title: "Nutrition et prévention du cancer",
    slug: "nutrition-prevention-cancer",
    excerpt: "Découvrez les aliments qui peuvent aider à réduire le risque de cancer.",
    content: "Une alimentation équilibrée joue un rôle crucial...",
    category: "Nutrition",
    tags: ["nutrition", "alimentation", "prévention"],
    image: "/healthy-cooking-colorful-food.jpg",
    author: {
      name: "Marie Dubois",
      role: "Nutritionniste",
      avatar: "/placeholder-user.jpg"
    },
    isPublished: true,
    isFeatured: false,
    readTime: 6,
    views: 1892,
    likes: 156,
    publishedAt: new Date('2024-10-18'),
    seo: {
      metaTitle: "Nutrition et prévention du cancer",
      metaDescription: "Les aliments pour prévenir le cancer",
      keywords: ["nutrition", "prévention", "alimentation"]
    }
  },
  {
    title: "Techniques de relaxation pour gérer l'anxiété",
    slug: "relaxation-anxiete-cancer",
    excerpt: "Apprenez des techniques simples pour réduire le stress et l'anxiété.",
    content: "Guide pratique des techniques de relaxation...",
    category: "Bien-être",
    tags: ["relaxation", "anxiété", "bien-être", "stress"],
    image: "/peaceful-nature-meditation.png",
    author: {
      name: "Sophie Leroy",
      role: "Psycho-oncologue",
      avatar: "/placeholder-user.jpg"
    },
    isPublished: true,
    isFeatured: false,
    readTime: 5,
    views: 892,
    likes: 67,
    publishedAt: new Date('2024-10-15'),
    seo: {
      metaTitle: "Techniques de relaxation anti-stress",
      metaDescription: "Gérez votre anxiété avec ces techniques",
      keywords: ["relaxation", "anxiété", "stress"]
    }
  }
]

// Données des vidéos
const videos = [
  {
    title: "Témoignage : Ma vie après le cancer du sein",
    slug: "temoignage-vie-apres-cancer-sein",
    description: "Marie partage son parcours de rémission et ses conseils pour retrouver confiance en soi.",
    category: "Témoignages",
    tags: ["témoignage", "cancer du sein", "rémission", "espoir"],
    thumbnail: "/woman-smiling-hopeful.jpg",
    videoUrl: "https://www.youtube.com/watch?v=example1",
    duration: 754, // 12:34 en secondes
    author: {
      name: "Marie Dupont",
      role: "Patiente",
      avatar: "/placeholder-user.jpg"
    },
    isPublished: true,
    isFeatured: true,
    views: 3245,
    likes: 287,
    publishedAt: new Date('2024-10-19'),
    seo: {
      metaTitle: "Témoignage : Vie après le cancer",
      metaDescription: "Parcours de rémission inspirant",
      keywords: ["témoignage", "cancer", "rémission"]
    }
  },
  {
    title: "Exercices de respiration pour réduire l'anxiété",
    slug: "exercices-respiration-anxiete",
    description: "Apprenez des techniques de respiration simples et efficaces avec notre thérapeute.",
    category: "Relaxation",
    tags: ["respiration", "anxiété", "relaxation", "bien-être"],
    thumbnail: "/person-breathing-meditation.jpg",
    videoUrl: "https://www.youtube.com/watch?v=example2",
    duration: 525, // 8:45 en secondes
    author: {
      name: "Dr. Jean Martin",
      role: "Thérapeute",
      avatar: "/placeholder-user.jpg"
    },
    isPublished: true,
    isFeatured: false,
    views: 1876,
    likes: 154,
    publishedAt: new Date('2024-10-17'),
    seo: {
      metaTitle: "Exercices de respiration anti-anxiété",
      metaDescription: "Techniques de respiration efficaces",
      keywords: ["respiration", "anxiété", "relaxation"]
    }
  }
]

async function seedDatabase() {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is undefined')
    }
    
    console.log('🔌 Connexion à MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connecté à MongoDB')

    // Nettoyer les collections existantes
    console.log('🗑️  Nettoyage des collections...')
    await Article.deleteMany({})
    await Video.deleteMany({})
    console.log('✅ Collections nettoyées')

    // Insérer les articles
    console.log('📚 Insertion des articles...')
    const createdArticles = await Article.insertMany(articles)
    console.log(`✅ ${createdArticles.length} articles insérés`)

    // Insérer les vidéos
    console.log('🎥 Insertion des vidéos...')
    const createdVideos = await Video.insertMany(videos)
    console.log(`✅ ${createdVideos.length} vidéos insérées`)

    console.log('\n🎉 Base de données peuplée avec succès!')
    console.log('\n📊 Résumé:')
    console.log(`  - ${createdArticles.length} articles`)
    console.log(`  - ${createdVideos.length} vidéos`)
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Erreur lors du peuplement de la base de données:', error)
    process.exit(1)
  }
}

// Exécuter le script
seedDatabase()

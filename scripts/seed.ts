import { config } from 'dotenv'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import Article from '@/models/Article'
import Video from '@/models/Video'
import bcrypt from 'bcryptjs'

// Charger les variables d'environnement depuis .env.local
config({ path: '.env.local' })

async function seedDatabase() {
  try {
    await connectDB()
    console.log('✅ Connexion à MongoDB établie')

    // Vider les collections existantes
    await User.deleteMany({})
    await Article.deleteMany({})
    await Video.deleteMany({})
    console.log('🧹 Collections vidées')

    // Créer des utilisateurs de test
    const users = [
      {
        name: 'Marie Dupont',
        email: 'marie.dupont@email.com',
        password: await bcrypt.hash('password123', 12),
        profile: {
          gender: 'female' as const,
          age: 35,
          mode: 'preventive' as const
        },
        role: 'user'
      },
      {
        name: 'Dr. Jean Martin',
        email: 'dr.martin@hopital.fr',
        password: await bcrypt.hash('doctor123', 12),
        profile: {
          gender: 'male' as const,
          age: 45,
          mode: 'preventive' as const
        },
        role: 'doctor'
      }
    ]

    const createdUsers = await User.insertMany(users)
    console.log(`👥 ${createdUsers.length} utilisateurs créés`)

    // Créer des articles
    const articles = [
      {
        title: "Les 10 habitudes pour réduire les risques de cancer",
        slug: "10-habitudes-reduire-risques-cancer",
        content: `
# Les 10 habitudes pour réduire les risques de cancer

Le cancer est une maladie complexe, mais de nombreuses recherches montrent que certaines habitudes peuvent considérablement réduire les risques.

## 1. Adopter une alimentation équilibrée
Une alimentation riche en fruits, légumes et fibres est essentielle...

## 2. Maintenir un poids santé
L'obésité est liée à plusieurs types de cancer...

## 3. Pratiquer une activité physique régulière
L'exercice régulier renforce le système immunitaire...

## 4. Éviter le tabac
Le tabagisme est la première cause de cancer évitable...

## 5. Limiter la consommation d'alcool
L'alcool augmente les risques de plusieurs cancers...

## 6. Se protéger du soleil
Les UV sont responsables de la plupart des cancers de la peau...

## 7. Faire les dépistages recommandés
La détection précoce sauve des vies...

## 8. Maintenir un bon sommeil
Un sommeil de qualité renforce les défenses naturelles...

## 9. Gérer le stress
Le stress chronique affaiblit le système immunitaire...

## 10. Éviter les expositions toxiques
Limitez l'exposition aux substances cancérigènes...
        `,
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
        publishedAt: new Date(),
        seo: {
          metaTitle: "10 habitudes pour prévenir le cancer | CareCompanion",
          metaDescription: "Découvrez les habitudes scientifiquement prouvées pour réduire vos risques de cancer. Guide complet par nos experts.",
          keywords: ["prévention cancer", "habitudes santé", "réduire risques cancer"]
        }
      },
      {
        title: "Comprendre l'importance du dépistage précoce",
        slug: "importance-depistage-precoce",
        content: `
# L'importance du dépistage précoce

Le dépistage précoce est l'un des outils les plus puissants dans la lutte contre le cancer...

## Qu'est-ce que le dépistage ?
Le dépistage consiste à rechercher la présence d'un cancer...

## Les différents types de dépistage
### Dépistage organisé
Des programmes nationaux existent pour certains cancers...

### Dépistage individuel
Sur recommandation de votre médecin...

## Les cancers les plus fréquents
### Cancer du sein
Mammographie recommandée tous les 2 ans...

### Cancer colorectal
Test immunologique recommandé...

### Cancer du col de l'utérus
Frottis cervical tous les 3 ans...
        `,
        excerpt: "Le dépistage précoce peut sauver des vies. Découvrez pourquoi et comment effectuer les dépistages recommandés.",
        category: "Dépistage",
        tags: ["dépistage", "prévention", "cancer", "santé"],
        author: {
          name: "Dr. Marie Leroy",
          role: "Médecin généraliste",
          avatar: "/placeholder-user.jpg"
        },
        image: "/medical-screening-checkup.jpg",
        readTime: 6,
        isPublished: true,
        isFeatured: false,
        views: 890,
        likes: 67,
        publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Hier
        seo: {
          metaTitle: "Dépistage précoce du cancer | CareCompanion",
          metaDescription: "Tout savoir sur l'importance du dépistage précoce pour la détection du cancer.",
          keywords: ["dépistage cancer", "détection précoce", "mammographie", "frottis"]
        }
      }
    ]

    const createdArticles = await Article.insertMany(articles)
    console.log(`📖 ${createdArticles.length} articles créés`)

    // Créer des vidéos
    const videos = [
      {
        title: "Exercices de relaxation anti-stress",
        slug: "exercices-relaxation-anti-stress",
        description: "Une séance de relaxation guidée de 15 minutes pour réduire le stress et l'anxiété. Parfait pour les patients en traitement ou en rémission.",
        category: "Relaxation",
        tags: ["relaxation", "stress", "méditation", "bien-être"],
        thumbnail: "/person-resting-peaceful.jpg",
        videoUrl: "https://example.com/video1.mp4",
        duration: 900, // 15 minutes
        author: {
          name: "Sophie Zen",
          role: "Instructrice de méditation",
          avatar: "/placeholder-user.jpg"
        },
        isPublished: true,
        isFeatured: true,
        views: 567,
        likes: 89,
        publishedAt: new Date(),
        seo: {
          metaTitle: "Relaxation anti-stress | Vidéos CareCompanion",
          metaDescription: "Séance de relaxation guidée pour réduire le stress pendant le parcours cancer.",
          keywords: ["relaxation", "stress", "cancer", "méditation"]
        }
      },
      {
        title: "Yoga doux pour la récupération",
        slug: "yoga-doux-recuperation",
        description: "Séance de yoga adaptée aux personnes en traitement contre le cancer. Mouvements doux pour maintenir la flexibilité et le bien-être.",
        category: "Exercices",
        tags: ["yoga", "exercice", "récupération", "doux"],
        thumbnail: "/yoga-gentle-exercise.jpg",
        videoUrl: "https://example.com/video2.mp4",
        duration: 1200, // 20 minutes
        author: {
          name: "Emma Yoga",
          role: "Professeure de yoga thérapeutique",
          avatar: "/placeholder-user.jpg"
        },
        isPublished: true,
        isFeatured: false,
        views: 423,
        likes: 56,
        publishedAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // Avant-hier
        seo: {
          metaTitle: "Yoga thérapeutique | Vidéos CareCompanion",
          metaDescription: "Yoga doux adapté aux patients en traitement contre le cancer.",
          keywords: ["yoga", "cancer", "exercice doux", "thérapeutique"]
        }
      }
    ]

    const createdVideos = await Video.insertMany(videos)
    console.log(`🎥 ${createdVideos.length} vidéos créées`)

    console.log('🎉 Base de données peuplée avec succès!')
    console.log('📊 Résumé:')
    console.log(`   - ${createdUsers.length} utilisateurs`)
    console.log(`   - ${createdArticles.length} articles`)
    console.log(`   - ${createdVideos.length} vidéos`)

  } catch (error) {
    console.error('❌ Erreur lors du peuplement:', error)
  }
}

// Exporter la fonction pour l'utiliser dans un script
export default seedDatabase

// Si ce fichier est exécuté directement
if (require.main === module) {
  seedDatabase().then(() => process.exit(0))
}

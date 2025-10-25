'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Clock, User, Calendar, Eye, Heart, Share2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface Article {
  _id: string
  title: string
  excerpt: string
  content: string
  image: string
  slug: string
  category: string
  readTime: number
  publishedAt: string
  author: {
    name: string
    role: string
  }
  isFeatured: boolean
  views: number
  likes: number
}

// Données mock pour les articles (même structure que dans useApi.ts)
const mockArticles: Article[] = [
  {
    _id: "1",
    title: "Guide complet de l'alimentation pendant le traitement du cancer",
    excerpt: "Découvrez les meilleures pratiques nutritionnelles pour maintenir votre force et votre énergie pendant le traitement.",
    content: "Un guide détaillé sur l'alimentation pendant le traitement du cancer avec des conseils pratiques pour maintenir votre énergie et votre santé pendant cette période difficile.",
    image: "/healthy-food-nutrition.png",
    slug: "alimentation-traitement-cancer",
    category: "Nutrition",
    readTime: 8,
    publishedAt: "2024-10-20T10:00:00Z",
    author: {
      name: "Dr. Marie Dubois",
      role: "Oncologue nutritionniste"
    },
    isFeatured: true,
    views: 1247,
    likes: 89
  },
  {
    _id: "2",
    title: "Prévention du cancer : 10 habitudes à adopter dès maintenant",
    excerpt: "Les habitudes de vie simples qui peuvent réduire significativement vos risques de développer un cancer.",
    content: "Découvrez 10 habitudes scientifiquement prouvées pour réduire vos risques de cancer et améliorer votre santé globale.",
    image: "/healthy-lifestyle-prevention.jpg",
    slug: "prevention-cancer-10-habitudes",
    category: "Prévention",
    readTime: 6,
    publishedAt: "2024-10-18T09:30:00Z",
    author: {
      name: "Dr. Pierre Martin",
      role: "Médecin préventeur"
    },
    isFeatured: true,
    views: 2134,
    likes: 156
  },
  {
    _id: "3",
    title: "Techniques de relaxation pour gérer l'anxiété liée au cancer",
    excerpt: "Apprenez des techniques simples et efficaces pour réduire le stress et l'anxiété pendant votre parcours de soins.",
    content: "Des techniques de relaxation éprouvées pour vous aider à gérer l'anxiété et le stress liés au cancer.",
    image: "/peaceful-nature-meditation.png",
    slug: "relaxation-anxiete-cancer",
    category: "Bien-être",
    readTime: 5,
    publishedAt: "2024-10-15T14:20:00Z",
    author: {
      name: "Sophie Leroy",
      role: "Psycho-oncologue"
    },
    isFeatured: false,
    views: 892,
    likes: 67
  },
  {
    _id: "4",
    title: "Exercices adaptés pendant et après le traitement du cancer",
    excerpt: "Un programme d'exercices doux et adaptés pour maintenir votre forme physique en toute sécurité.",
    content: "Guide complet d'exercices adaptés pour maintenir votre forme physique pendant et après le traitement du cancer.",
    image: "/yoga-gentle-exercise.jpg",
    slug: "exercices-traitement-cancer",
    category: "Activité physique",
    readTime: 7,
    publishedAt: "2024-10-12T11:45:00Z",
    author: {
      name: "Marc Dupont",
      role: "Kinésithérapeute spécialisé"
    },
    isFeatured: false,
    views: 756,
    likes: 45
  },
  {
    _id: "5",
    title: "Comprendre les effets secondaires de la chimiothérapie",
    excerpt: "Guide complet pour anticiper et gérer les effets secondaires les plus courants de la chimiothérapie.",
    content: "Tout ce que vous devez savoir sur les effets secondaires de la chimiothérapie et comment les gérer efficacement.",
    image: "/medical-science-laboratory.jpg",
    slug: "effets-secondaires-chimiotherapie",
    category: "Traitement",
    readTime: 9,
    publishedAt: "2024-10-10T16:00:00Z",
    author: {
      name: "Dr. Anne Moreau",
      role: "Oncologue médicale"
    },
    isFeatured: false,
    views: 1567,
    likes: 112
  },
  {
    _id: "6",
    title: "Comment parler de votre cancer à vos proches",
    excerpt: "Conseils pratiques pour communiquer efficacement avec votre famille et vos amis sur votre diagnostic.",
    content: "Guide pratique pour vous aider à communiquer avec vos proches au sujet de votre diagnostic de cancer.",
    image: "/doctor-patient-conversation.png",
    slug: "parler-cancer-proches",
    category: "Support",
    readTime: 6,
    publishedAt: "2024-10-08T13:15:00Z",
    author: {
      name: "Claire Petit",
      role: "Assistante sociale"
    },
    isFeatured: false,
    views: 1023,
    likes: 78
  }
]

export default function ArticlePage() {
  const params = useParams()
  const slug = params.slug as string
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    // Simuler le chargement de l'article
    const fetchArticle = async () => {
      setLoading(true)
      
      // Simulation d'un délai API
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const foundArticle = mockArticles.find(a => a.slug === slug)
      setArticle(foundArticle || null)
      setLoading(false)
    }

    fetchArticle()
  }, [slug])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleLike = () => {
    setLiked(!liked)
    // Ici on pourrait envoyer une requête à l'API pour enregistrer le like
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article?.title,
          text: article?.excerpt,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Erreur lors du partage:', err)
      }
    } else {
      // Fallback pour les navigateurs qui ne supportent pas Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert('Lien copié dans le presse-papiers !')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4">
        <div className="max-w-4xl mx-auto pt-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4">
        <div className="max-w-4xl mx-auto pt-8">
          <Card>
            <CardContent className="text-center py-12">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Article non trouvé</h1>
              <p className="text-gray-600 mb-6">L'article que vous cherchez n'existe pas ou a été supprimé.</p>
              <Link href="/">
                <Button variant="default">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour à l'accueil
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto p-4 pt-8">
        {/* Navigation */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux articles
            </Button>
          </Link>
        </div>

        {/* Article */}
        <article>
          <Card className="overflow-hidden">
            {/* Image de couverture */}
            <div className="relative h-64 md:h-80">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-4 left-4">
                <Badge variant="secondary" className="mb-2">
                  {article.category}
                </Badge>
              </div>
            </div>

            <CardHeader>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {article.title}
              </h1>
              
              <p className="text-lg text-gray-600 mt-2">
                {article.excerpt}
              </p>

              {/* Métadonnées */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-4">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{article.author.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime} min de lecture</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{article.views.toLocaleString()} vues</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                <Button
                  variant={liked ? "default" : "outline"}
                  size="sm"
                  onClick={handleLike}
                  className="flex items-center gap-2"
                >
                  <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                  <span>{liked ? article.likes + 1 : article.likes}</span>
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Partager
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <Separator className="mb-6" />
              
              {/* Contenu de l'article */}
              <div className="prose prose-gray max-w-none">
                <div className="text-gray-800 leading-relaxed space-y-4">
                  {article.content}
                </div>
              </div>

              {/* Informations sur l'auteur */}
              <Separator className="my-8" />
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">À propos de l'auteur</h3>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {article.author.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{article.author.name}</p>
                    <p className="text-gray-600">{article.author.role}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </article>
      </div>
    </div>
  )
}

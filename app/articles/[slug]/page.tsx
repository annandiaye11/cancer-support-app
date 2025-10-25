'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Clock, User, Calendar, Eye, Heart, Share2, Bookmark } from 'lucide-react'
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
  tags?: string[]
  readTime: number
  publishedAt: string
  author: {
    name: string
    role: string
    avatar?: string
  }
  isFeatured: boolean
  views: number
  likes: number
}

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const [article, setArticle] = useState<Article | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true)
        
        // Récupérer l'article par slug depuis l'API
        const response = await fetch(`/api/articles?search=${slug}&limit=1`)
        const data = await response.json()
        
        if (data.articles && data.articles.length > 0) {
          const foundArticle = data.articles[0]
          setArticle(foundArticle)
          
          // Incrémenter le compteur de vues
          await fetch(`/api/articles/${foundArticle._id}/view`, { method: 'POST' })
          
          // Récupérer les articles similaires (même catégorie)
          const relatedResponse = await fetch(`/api/articles?category=${foundArticle.category}&limit=4`)
          const relatedData = await relatedResponse.json()
          
          // Filtrer pour exclure l'article actuel
          const filtered = relatedData.articles?.filter((a: Article) => a._id !== foundArticle._id).slice(0, 3) || []
          setRelatedArticles(filtered)
        } else {
          setArticle(null)
        }
      } catch (error) {
        console.error('Erreur lors du chargement de l\'article:', error)
        setArticle(null)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchArticle()
    }
  }, [slug])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleLike = async () => {
    if (!article) return
    setLiked(!liked)
    // Enregistrer le like dans l'API
    try {
      await fetch(`/api/articles/${article._id}/like`, { method: 'POST' })
    } catch (error) {
      console.error('Erreur lors du like:', error)
    }
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
    // Sauvegarder dans localStorage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]')
    if (!bookmarked && article) {
      bookmarks.push(article._id)
    } else {
      const index = bookmarks.indexOf(article?._id)
      if (index > -1) bookmarks.splice(index, 1)
    }
    localStorage.setItem('bookmarkedArticles', JSON.stringify(bookmarks))
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
              <Link href="/articles">
                <Button variant="default">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour aux articles
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
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/articles">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Articles</span>
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm">
                Accueil
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 pt-8">

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
                <Button 
                  variant={bookmarked ? "default" : "outline"} 
                  size="sm" 
                  onClick={handleBookmark}
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Partager
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <Separator className="mb-6" />
              
              {/* Contenu de l'article avec rendu HTML */}
              <div className="prose prose-lg prose-gray max-w-none">
                <div 
                  className="text-gray-800 leading-relaxed article-content"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Tags :</h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-primary/10">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Informations sur l'auteur */}
              <Separator className="my-8" />
              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">À propos de l'auteur</h3>
                <div className="flex items-start gap-4">
                  {article.author.avatar ? (
                    <Image
                      src={article.author.avatar}
                      alt={article.author.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-linear-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold">
                      {article.author.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-foreground">{article.author.name}</p>
                    <p className="text-muted-foreground">{article.author.role}</p>
                  </div>
                </div>
              </div>

              {/* Articles similaires */}
              {relatedArticles.length > 0 && (
                <>
                  <Separator className="my-8" />
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Articles similaires</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {relatedArticles.map((relatedArticle) => (
                        <Link 
                          key={relatedArticle._id} 
                          href={`/articles/${relatedArticle.slug}`}
                          className="group"
                        >
                          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="relative h-32">
                              <Image
                                src={relatedArticle.image}
                                alt={relatedArticle.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>
                            <CardContent className="p-4">
                              <Badge variant="secondary" className="mb-2 text-xs">
                                {relatedArticle.category}
                              </Badge>
                              <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                                {relatedArticle.title}
                              </h4>
                              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                <span>{relatedArticle.readTime} min</span>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </article>
      </div>
    </div>
  )
}

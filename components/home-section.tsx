'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle2, Circle, ChevronRight, Clock, TrendingUp, Book, Calendar, Target } from "lucide-react"
import { useState, useEffect } from "react"
import { useHomeStats, useArticles } from "@/hooks/useApi"
import { useUserId } from "@/hooks/use-user-id"
import Link from "next/link"

interface HomeSectionProps {
  userProfile: {
    gender: "male" | "female"
    mode: "preventive" | "curative"
    age: number
  }
}

export function HomeSection({ userProfile }: HomeSectionProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [screenings, setScreenings] = useState<Record<string, boolean>>({
    "2025-01": false,
    "2025-02": false,
    "2025-03": false,
  })
  const [completedScreenings, setCompletedScreenings] = useState<Record<string, boolean>>({})

  // Récupérer l'ID utilisateur
  const { userId, isLoading: isLoadingUserId } = useUserId()

  // Log pour déboguer le userId
  useEffect(() => {
    if (userId) {
      console.log('🆔 Home Section - userId actuel:', userId)
    }
  }, [userId])

  // Utiliser les hooks API pour récupérer les vraies données
  // On passe isLoadingUserId pour éviter de charger les stats avant que userId soit prêt
  const { stats, loading: statsLoading } = useHomeStats(userId || undefined, isLoadingUserId)
  const { articles: allArticles, loading: articlesLoading } = useArticles({ limit: 6 })
  
  // Filtrer les articles recommandés selon le profil utilisateur
  const getRecommendedArticles = (): any[] => {
    // Si on a des articles de l'API, les utiliser avec filtrage par tags
    if (allArticles && allArticles.length > 0) {
      // Prioriser les articles en vedette
      const featured = allArticles.filter((article: any) => article.isFeatured)
      const nonFeatured = allArticles.filter((article: any) => !article.isFeatured)
      
      // Filtrer par tags correspondant au profil
      const filtered = [...featured, ...nonFeatured].filter((article: any) => {
        const tags = article.tags || []
        const matchesGender = tags.includes(userProfile.gender) || tags.includes('unisex') || tags.length === 0
        const matchesMode = tags.includes(userProfile.mode) || tags.length === 0
        return matchesGender && matchesMode
      })
      
      return filtered.slice(0, 4)
    }
    
    // Sinon, utiliser le fallback local avec articles hardcodés
    const commonArticles = [
      {
        _id: "1",
        id: 1,
        title: "Les aliments anti-cancer à privilégier",
        category: "Nutrition",
        excerpt: "Découvrez les aliments riches en antioxydants",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400",
        readTime: 8,
        isFeatured: true,
      },
      {
        _id: "5",
        id: 5,
        title: "L'importance de l'activité physique",
        category: "Prévention",
        excerpt: "Pourquoi bouger régulièrement est essentiel",
        image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400",
        readTime: 7,
        isFeatured: true,
      },
    ]

    const femaleArticles = [
      {
        _id: "7",
        id: 7,
        title: "Comprendre les différents types de dépistage",
        category: "Dépistage",
        excerpt: "Guide complet des examens recommandés pour les femmes",
        image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400",
        readTime: 12,
        isFeatured: true,
      },
      ...commonArticles,
    ]

    const maleArticles = [
      {
        _id: "8",
        id: 8,
        title: "Comprendre les différents types de dépistage",
        category: "Dépistage",
        excerpt: "Guide complet des examens recommandés pour les hommes",
        image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400",
        readTime: 12,
        isFeatured: true,
      },
      ...commonArticles,
    ]

    const preventiveArticles = [
      {
        _id: "2",
        id: 2,
        title: "Comprendre les différents types de dépistage",
        category: "Prévention",
        excerpt: "Guide complet des examens recommandés",
        image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400",
        readTime: 12,
        isFeatured: false,
      },
    ]

    const curativeArticles = [
      {
        _id: "3",
        id: 3,
        title: "Gérer la fatigue pendant le traitement",
        category: "Traitement",
        excerpt: "Conseils pratiques pour mieux gérer la fatigue",
        image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400",
        readTime: 6,
        isFeatured: false,
      },
      {
        _id: "4",
        id: 4,
        title: "Méditation et cancer : les bienfaits prouvés",
        category: "Bien-être",
        excerpt: "Comment la méditation améliore votre qualité de vie",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
        readTime: 10,
        isFeatured: false,
      },
    ]

    const genderArticles = userProfile.gender === "female" ? femaleArticles : maleArticles
    const modeArticles = userProfile.mode === "preventive" ? preventiveArticles : curativeArticles
    
    return [...genderArticles.slice(0, 2), ...modeArticles.slice(0, 2)]
  }
  
  const articles = getRecommendedArticles()
  
  // Obtenir la clé du mois actuel
  const today = new Date()
  const monthKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`
  
  // Données de démonstration pour les dépistages
  const recommendedScreenings = [
    {
      _id: "1",
      name: "Mammographie",
      description: "Dépistage cancer du sein (tous les 2 ans)",
      dueDate: new Date(2025, 2, 15)
    },
    {
      _id: "2", 
      name: "Frottis cervical",
      description: "Dépistage cancer du col (tous les 3 ans)",
      dueDate: new Date(2025, 5, 10)
    }
  ]
  const screeningsLoading = false

  const toggleScreening = (monthKey: string) => {
    setScreenings(prev => ({
      ...prev,
      [monthKey]: !prev[monthKey]
    }))
  }

  const toggleCompletedScreening = (screeningId: string) => {
    setCompletedScreenings(prev => ({
      ...prev,
      [screeningId]: !prev[screeningId]
    }))
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const formatMonth = (monthKey: string) => {
    const [year, month] = monthKey.split('-')
    const date = new Date(parseInt(year), parseInt(month) - 1)
    return date.toLocaleDateString('fr-FR', {
      month: 'long',
      year: 'numeric'
    })
  }

  if (statsLoading || screeningsLoading || articlesLoading) {
    return (
      <div className="space-y-6 pb-20 md:pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="p-4">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Statistiques principales */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                <Book className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.totalArticles || 0}</p>
                <p className="text-sm text-muted-foreground">Articles disponibles</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.upcomingAppointments || 0}</p>
                <p className="text-sm text-muted-foreground">RDV à venir</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900">
                <Target className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.completedTasks || 0}</p>
                <p className="text-sm text-muted-foreground">Tâches complétées</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900">
                <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.totalVideos || 0}</p>
                <p className="text-sm text-muted-foreground">Vidéos disponibles</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Calendrier de dépistage */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Calendrier de dépistage</h3>
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-primary via-primary to-primary/80 shadow-lg shadow-primary/30 flex items-center justify-center group hover:scale-105 transition-all duration-300">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary-foreground">
                    {new Date().getDate()}
                  </div>
                  <div className="text-xs text-primary-foreground/80 font-medium -mt-1">
                    {new Date().toLocaleDateString("fr-FR", { month: "short" })}
                  </div>
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-accent-foreground rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            {new Date().toLocaleDateString("fr-FR", { 
              weekday: "long", 
              day: "numeric", 
              month: "long", 
              year: "numeric" 
            })}
          </p>
        </div>

        {userProfile.gender === "female" && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox
                  id={`screening-${monthKey}`}
                  checked={screenings[monthKey] || false}
                  onCheckedChange={() => toggleScreening(monthKey)}
                />
                <label htmlFor={`screening-${monthKey}`} className="text-sm font-medium text-foreground cursor-pointer">
                  Auto-examen des seins ce mois-ci
                </label>
              </div>
              {screenings[monthKey] && <CheckCircle2 className="w-5 h-5 text-primary" />}
            </div>
            {userProfile.age >= 25 && (
              <div className="flex items-center gap-3 mt-3">
                <Checkbox id="pap-smear" />
                <label htmlFor="pap-smear" className="text-sm text-muted-foreground cursor-pointer">
                  Frottis cervical (tous les 3 ans)
                </label>
              </div>
            )}
            {userProfile.age >= 50 && (
              <div className="flex items-center gap-3 mt-3">
                <Checkbox id="colorectal" />
                <label htmlFor="colorectal" className="text-sm text-muted-foreground cursor-pointer">
                  Dépistage cancer colorectal (tous les 2 ans)
                </label>
              </div>
            )}
          </div>
        )}

        {userProfile.gender === "male" && (
          <div className="mt-4 pt-4 border-t border-border space-y-3">
            {userProfile.age >= 50 && (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id={`screening-${monthKey}`}
                      checked={screenings[monthKey] || false}
                      onCheckedChange={() => toggleScreening(monthKey)}
                    />
                    <label htmlFor={`screening-${monthKey}`} className="text-sm font-medium text-foreground cursor-pointer">
                      Test PSA prostate (annuel)
                    </label>
                  </div>
                  {screenings[monthKey] && <CheckCircle2 className="w-5 h-5 text-primary" />}
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox id="colorectal-m" />
                  <label htmlFor="colorectal-m" className="text-sm text-muted-foreground cursor-pointer">
                    Dépistage cancer colorectal (tous les 2 ans)
                  </label>
                </div>
              </>
            )}
            {userProfile.age >= 15 && (
              <div className="flex items-center gap-3">
                <Checkbox id="testicular" />
                <label htmlFor="testicular" className="text-sm text-muted-foreground cursor-pointer">
                  Auto-examen testiculaire mensuel
                </label>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Dépistages recommandés */}
      {recommendedScreenings && recommendedScreenings.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Dépistages recommandés</h3>
            <Button variant="outline" size="sm">
              Voir tout
            </Button>
          </div>
          <div className="space-y-3">
            {recommendedScreenings.map((screening: any) => (
              <div key={screening._id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">{screening.name}</p>
                  <p className="text-sm text-muted-foreground">{screening.description}</p>
                </div>
                <Button 
                  size="sm"
                  variant={completedScreenings[screening._id] ? "default" : "outline"}
                  onClick={() => toggleCompletedScreening(screening._id)}
                >
                  {completedScreenings[screening._id] ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Fait
                    </>
                  ) : (
                    <>
                      <Circle className="w-4 h-4 mr-2" />
                      À faire
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Articles recommandés */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">Articles recommandés</h3>
            <p className="text-sm text-muted-foreground">Conseils et informations pour vous accompagner</p>
          </div>
          <Link href="/articles">
            <Button variant="outline" size="sm" className="gap-2">
              Voir tous
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {articles.length > 0 && (
          <>
            {/* Article principal en vedette */}
            <Link 
              href={`/articles/${articles[0].slug}`}
              className="block group"
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative h-64 md:h-full">
                    <img 
                      src={articles[0].image} 
                      alt={articles[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {articles[0].isFeatured && (
                      <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Populaire
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                        {articles[0].category}
                      </span>
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <h4 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {articles[0].title}
                      </h4>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {articles[0].excerpt}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{articles[0].readTime} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Book className="w-4 h-4" />
                          <span>{articles[0].views || 0} vues</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-2">
                        Lire l'article
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Autres articles en grille */}
            {articles.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {articles.slice(1, 4).map((article) => (
                  <Link 
                    key={article._id} 
                    href={`/articles/${article.slug}`}
                    className="group"
                  >
                    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 h-full">
                      {/* Image */}
                      <div className="relative h-48">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {article.isFeatured && (
                          <div className="absolute top-2 right-2">
                            <TrendingUp className="w-4 h-4 text-orange-500 bg-white rounded-full p-1" />
                          </div>
                        )}
                      </div>

                      {/* Contenu */}
                      <div className="p-4">
                        <span className="text-xs text-primary font-medium">
                          {article.category}
                        </span>
                        <h4 className="font-semibold text-base mt-2 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {article.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{article.readTime} min</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Book className="w-3 h-3" />
                            <span>{article.views || 0}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle2, Circle, ChevronRight, Clock, TrendingUp, Book, Calendar, Target } from "lucide-react"
import { useState } from "react"
import { useHomeStats } from "@/hooks/useApi"

interface HomeSectionProps {
  userProfile: {
    gender: "male" | "female"
    mode: "preventive" | "curative"
    age: number
  }
  onViewAllArticles?: () => void
  onArticleClick?: (articleId: number) => void
}

export function HomeSection({ userProfile, onViewAllArticles, onArticleClick }: HomeSectionProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [screenings, setScreenings] = useState<Record<string, boolean>>({
    "2025-01": false,
    "2025-02": false,
    "2025-03": false,
  })
  const [completedScreenings, setCompletedScreenings] = useState<Record<string, boolean>>({})

  // Utiliser les hooks API
  const { stats, loading: statsLoading } = useHomeStats()
  
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

  // Articles recommandés selon le genre et le mode
  const getRecommendedArticles = () => {
    const commonArticles = [
      {
        id: 1,
        title: "Les aliments anti-cancer à privilégier",
        category: "Nutrition",
        excerpt: "Découvrez les aliments riches en antioxydants",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400",
        readTime: "8 min",
        trending: true,
      },
      {
        id: 5,
        title: "L'importance de l'activité physique",
        category: "Prévention",
        excerpt: "Pourquoi bouger régulièrement est essentiel",
        image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400",
        readTime: "7 min",
        trending: true,
      },
    ]

    const femaleArticles = [
      {
        id: 2,
        title: "Auto-examen des seins : guide complet",
        category: "Prévention",
        excerpt: "Les gestes essentiels à connaître",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
        readTime: "6 min",
        trending: false,
      },
      {
        id: 3,
        title: "Mammographie : tout ce qu'il faut savoir",
        category: "Dépistage",
        excerpt: "Préparation et déroulement de l'examen",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400",
        readTime: "5 min",
        trending: false,
      },
    ]

    const maleArticles = [
      {
        id: 4,
        title: "Dépistage du cancer de la prostate",
        category: "Dépistage",
        excerpt: "Quand et comment se faire dépister",
        image: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=400",
        readTime: "7 min",
        trending: false,
      },
    ]

    if (userProfile.gender === "female") {
      return [...commonArticles, ...femaleArticles]
    } else {
      return [...commonArticles, ...maleArticles]
    }
  }

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

  if (statsLoading || screeningsLoading) {
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
                <p className="text-2xl font-bold">{stats?.totalArticlesRead || 0}</p>
                <p className="text-sm text-muted-foreground">Articles lus</p>
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
                <p className="text-2xl font-bold">{stats?.screeningsDue || 0}</p>
                <p className="text-sm text-muted-foreground">Dépistages dus</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900">
                <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats?.healthScore || 85}%</p>
                <p className="text-sm text-muted-foreground">Score santé</p>
              </div>
            </div>
          </Card>
        </div>
      )}

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

      {/* Recommandations personnalisées */}
      {stats?.recommendations && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recommandations pour vous</h3>
          <div className="space-y-3">
            {stats.recommendations.map((rec: any, index: number) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="relative mt-1">
                  <div className="w-24 h-24 rounded-full bg-linear-to-br from-primary/20 to-accent/30 flex items-center justify-center border-2 border-primary/30 shadow-lg">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div className="absolute -inset-1 rounded-full bg-linear-to-r from-primary/20 to-accent/20 blur-sm -z-10 animate-pulse"></div>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{rec.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                  <Button variant="link" className="h-auto p-0 mt-2">
                    En savoir plus <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Articles recommandés */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Articles recommandés</h3>
          <Button variant="outline" size="sm" onClick={onViewAllArticles}>
            Voir tous
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getRecommendedArticles().slice(0, 4).map((article) => (
            <div 
              key={article.id} 
              className="group cursor-pointer"
              onClick={() => onArticleClick?.(article.id)}
            >
              <div className="flex gap-3">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {article.trending && (
                    <div className="absolute top-1 right-1">
                      <TrendingUp className="w-3 h-3 text-orange-500" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs text-primary font-medium">{article.category}</span>
                  <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

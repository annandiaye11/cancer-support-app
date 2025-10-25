'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle2, Circle, ChevronRight, Clock, TrendingUp, Book, Calendar, Target } from "lucide-react"
import { useState } from "react"

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
  
  // États supplémentaires pour les données
  const [completedScreenings, setCompletedScreenings] = useState<Record<string, boolean>>({})
  const [stats] = useState<any>({
    totalArticlesRead: 12,
    upcomingAppointments: 2,
    screeningsDue: 1,
    recommendations: [
      { title: "Prendre un rendez-vous de dépistage", type: "screening" },
      { title: "Lire l'article sur la prévention", type: "article" }
    ]
  })
  const [statsLoading] = useState(false)
  const [screeningsLoading] = useState(false)
  const [recommendedScreenings] = useState<any[]>([
    {
      _id: "mammography",
      type: "Mammographie",
      description: "Dépistage du cancer du sein",
      nextDue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    }
  ])
  
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
        title: "Comprendre les différents types de dépistage",
        category: "Dépistage",
        excerpt: "Guide complet des examens recommandés",
        image: "/medical-screening-healthcare.jpg",
        readTime: "12 min",
        trending: true,
      },
      ...commonArticles,
    ]

    const maleArticles = [
      {
        id: 2,
        title: "Comprendre les différents types de dépistage",
        category: "Dépistage",
        excerpt: "Guide complet des examens recommandés",
        image: "/medical-screening-healthcare.jpg",
        readTime: "12 min",
        trending: true,
      },
      ...commonArticles,
    ]

    const preventiveArticles = [
      {
        id: 2,
        title: "Comprendre les différents types de dépistage",
        category: "Prévention",
        excerpt: "Guide complet des examens recommandés",
        image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400",
        readTime: "12 min",
        trending: false,
      },
    ]

    const curativeArticles = [
      {
        id: 3,
        title: "Gérer la fatigue pendant le traitement",
        category: "Traitement",
        excerpt: "Conseils pratiques pour mieux gérer la fatigue",
        image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400",
        readTime: "6 min",
        trending: false,
      },
      {
        id: 4,
        title: "Méditation et cancer : les bienfaits prouvés",
        category: "Bien-être",
        excerpt: "Comment la méditation améliore votre qualité de vie",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
        readTime: "10 min",
        trending: false,
      },
    ]

    const genderArticles = userProfile.gender === "female" ? femaleArticles : maleArticles
    const modeArticles = userProfile.mode === "preventive" ? preventiveArticles : curativeArticles
    
    return [...genderArticles.slice(0, 2), ...modeArticles.slice(0, 2)]
  }

  const [articles] = useState(getRecommendedArticles())

  const toggleScreening = (screeningId: string) => {
    setCompletedScreenings(prev => ({
      ...prev,
      [screeningId]: !prev[screeningId]
    }))
  }

  if (statsLoading || screeningsLoading) {
    return (
      <div className="space-y-6 pb-20 md:pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="p-4 animate-pulse">
              <div className="h-16 bg-muted rounded"></div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const today = new Date()
  const todayFormatted = today.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

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
        </div>
      )}

      {/* Dépistages recommandés */}
      <Card className="p-5">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Dépistages recommandés</h3>
          
          {userProfile.gender === "female" && (
            <div className="space-y-3">
              {userProfile.age >= 25 && (
                <div className="flex items-center gap-3">
                  <Checkbox id="cervical" />
                  <label htmlFor="cervical" className="text-sm text-muted-foreground cursor-pointer">
                    Frottis cervical (tous les 3 ans)
                  </label>
                </div>
              )}
              {userProfile.age >= 50 && (
                <div className="flex items-center gap-3">
                  <Checkbox id="mammography" />
                  <label htmlFor="mammography" className="text-sm text-muted-foreground cursor-pointer">
                    Mammographie (tous les 2 ans)
                  </label>
                </div>
              )}
              {userProfile.age >= 50 && (
                <div className="flex items-center gap-3">
                  <Checkbox id="colorectal-f" />
                  <label htmlFor="colorectal-f" className="text-sm text-muted-foreground cursor-pointer">
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
                      id="screening-prostate"
                      checked={screenings["prostate"] || false}
                      onCheckedChange={() => toggleScreening("prostate")}
                    />
                    <label htmlFor="screening-prostate" className="text-sm font-medium text-foreground cursor-pointer">
                      Test PSA prostate (annuel)
                    </label>
                  </div>
                  {screenings["prostate"] && <CheckCircle2 className="w-5 h-5 text-primary" />}
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
            <div className="flex items-center gap-3">
              <Checkbox id="skin-check-m" />
              <label htmlFor="skin-check-m" className="text-sm text-muted-foreground cursor-pointer">
                Surveillance de la peau (tous les 6 mois)
              </label>
            </div>
          </div>
        )}
        </div>
      </Card>

      {/* Articles Carousel */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Articles recommandés</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-1"
            onClick={onViewAllArticles}
          >
            Voir tout
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="shrink-0 w-[280px] overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer snap-start group"
              onClick={() => onArticleClick?.(article.id)}
            >
              <div className="aspect-video bg-linear-to-br from-primary/20 to-accent/20 relative overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {article.trending && (
                  <div className="absolute top-2 left-2">
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
                      <TrendingUp className="w-3 h-3" />
                      <span>Populaire</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2">
                  {article.category}
                </div>
                <h4 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{article.excerpt}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{article.readTime} de lecture</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Dépistages recommandés */}
      {recommendedScreenings && recommendedScreenings.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Dépistages recommandés</h3>
          </div>
          
          <div className="space-y-3">
            {recommendedScreenings.map((screening: any) => (
              <div key={screening._id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-foreground">{screening.type}</p>
                  <p className="text-xs text-muted-foreground">{screening.description}</p>
                  <p className="text-xs text-muted-foreground">
                    Échéance: {new Date(screening.nextDue).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <Button
                  variant={completedScreenings[screening._id] ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleScreening(screening._id)}
                >
                  {completedScreenings[screening._id] ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Circle className="w-4 h-4" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Recommandations */}
      {stats?.recommendations && (
        <Card className="p-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recommandations pour vous</h3>
          <div className="space-y-3">
            {stats.recommendations.map((rec: any, index: number) => (
              <div key={index} className="p-3 rounded-lg bg-muted/30">
                <p className="text-sm font-medium">{rec.title}</p>
                <p className="text-xs text-muted-foreground capitalize">{rec.type}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Calendrier d'aujourd'hui */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Aujourd'hui</h3>
        </div>
        
        <div className="flex flex-col items-center justify-center py-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-linear-to-br from-primary/20 to-accent/30 flex items-center justify-center border-2 border-primary/30 shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {today.getDate()}
                </div>
                <div className="text-xs text-primary/80 font-medium">
                  {today.toLocaleDateString('fr-FR', { month: 'short' }).toUpperCase()}
                </div>
              </div>
            </div>
            <div className="absolute -inset-1 rounded-full bg-linear-to-r from-primary/20 to-accent/20 blur-sm -z-10 animate-pulse"></div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground text-center capitalize">
            {todayFormatted}
          </p>
        </div>
      </Card>

      {/* Articles recommandés */}
      <Card className="p-5">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Articles recommandés</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onViewAllArticles}
            >
              Voir tout
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid gap-4">
            {articles.slice(0, 3).map((article) => (
              <div 
                key={article.id}
                className="flex gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer transition-colors"
                onClick={() => onArticleClick?.(article.id)}
              >
                <div className="w-16 h-16 bg-muted rounded-lg shrink-0"></div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm line-clamp-2">{article.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{article.readTime}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}

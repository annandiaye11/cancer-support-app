"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Video, Play, Clock, TrendingUp, Shield } from "lucide-react"

interface PreventionVideosSectionProps {
  userProfile: {
    gender: "male" | "female"
    mode: "preventive" | "curative"
    age: number
  }
}

export function PreventionVideosSection({ userProfile }: PreventionVideosSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", label: "Toutes" },
    { id: "screening", label: "Dépistages" },
    { id: "prevention", label: "Prévention" },
    { id: "lifestyle", label: "Hygiène de vie" },
    { id: "nutrition", label: "Nutrition" },
    { id: "exercise", label: "Activité physique" },
  ]

  // Vidéos de prévention selon le genre
  const getVideos = () => {
    const commonVideos = [
      {
        id: 1,
        title: "Les 10 gestes de prévention quotidiens",
        category: "prevention",
        duration: "12:30",
        thumbnail: "/prevention-daily-habits.jpg",
        views: "25.3k",
        trending: true,
        description: "Découvrez les habitudes simples qui réduisent les risques de cancer",
      },
      {
        id: 2,
        title: "Alimentation anti-cancer : les bases",
        category: "nutrition",
        duration: "18:45",
        thumbnail: "/healthy-nutrition-colorful.jpg",
        views: "18.7k",
        trending: true,
        description: "Les aliments à privilégier et ceux à éviter pour prévenir le cancer",
      },
      {
        id: 3,
        title: "Dépistage du cancer colorectal : pourquoi c'est important",
        category: "screening",
        duration: "10:20",
        thumbnail: "/colorectal-screening-info.jpg",
        views: "12.4k",
        trending: false,
        description: "Tout savoir sur le test de dépistage colorectal à partir de 50 ans",
      },
      {
        id: 4,
        title: "Activité physique et prévention des cancers",
        category: "exercise",
        duration: "15:15",
        thumbnail: "/exercise-prevention-health.jpg",
        views: "22.1k",
        trending: true,
        description: "Comment l'exercice régulier réduit les risques de plusieurs cancers",
      },
      {
        id: 5,
        title: "Surveillance des grains de beauté",
        category: "screening",
        duration: "8:35",
        thumbnail: "/skin-check-melanoma.jpg",
        views: "14.8k",
        trending: false,
        description: "Apprenez la méthode ABCDE pour surveiller votre peau",
      },
      {
        id: 6,
        title: "Réduire l'exposition aux substances toxiques",
        category: "prevention",
        duration: "11:50",
        thumbnail: "/toxins-environment-safety.jpg",
        views: "9.2k",
        trending: false,
        description: "Identifier et éviter les facteurs de risque environnementaux",
      },
      {
        id: 7,
        title: "Le rôle du sommeil dans la prévention",
        category: "lifestyle",
        duration: "13:25",
        thumbnail: "/sleep-health-prevention.jpg",
        views: "16.5k",
        trending: false,
        description: "Comment un bon sommeil renforce votre système immunitaire",
      },
      {
        id: 8,
        title: "Gestion du stress pour réduire les risques",
        category: "lifestyle",
        duration: "14:40",
        thumbnail: "/stress-management-relaxation.jpg",
        views: "19.3k",
        trending: true,
        description: "Techniques de relaxation et impact sur la santé",
      },
    ]

    const femaleVideos = [
      {
        id: 101,
        title: "Auto-examen des seins : tutoriel complet",
        category: "screening",
        duration: "9:15",
        thumbnail: "/breast-self-exam-tutorial.jpg",
        views: "31.2k",
        trending: true,
        description: "Guide pas à pas pour réaliser l'auto-examen mensuel",
      },
      {
        id: 102,
        title: "Mammographie : déroulement et importance",
        category: "screening",
        duration: "7:30",
        thumbnail: "/mammography-procedure.jpg",
        views: "15.6k",
        trending: false,
        description: "Tout savoir sur le dépistage par mammographie après 50 ans",
      },
      {
        id: 103,
        title: "Frottis cervical : un geste qui sauve",
        category: "screening",
        duration: "6:45",
        thumbnail: "/pap-smear-screening.jpg",
        views: "13.8k",
        trending: false,
        description: "L'importance du dépistage du cancer du col de l'utérus",
      },
      {
        id: 104,
        title: "Hormones et prévention du cancer du sein",
        category: "prevention",
        duration: "16:20",
        thumbnail: "/hormones-breast-health.jpg",
        views: "11.4k",
        trending: false,
        description: "Comprendre le lien entre hormones et risque de cancer",
      },
    ]

    const maleVideos = [
      {
        id: 201,
        title: "Auto-examen testiculaire : mode d'emploi",
        category: "screening",
        duration: "6:50",
        thumbnail: "/testicular-self-exam.jpg",
        views: "18.4k",
        trending: true,
        description: "Comment détecter précocement le cancer testiculaire",
      },
      {
        id: 202,
        title: "Dépistage du cancer de la prostate : PSA et toucher rectal",
        category: "screening",
        duration: "11:30",
        thumbnail: "/prostate-screening-psa.jpg",
        views: "24.7k",
        trending: true,
        description: "Les examens de dépistage à partir de 50 ans",
      },
      {
        id: 203,
        title: "Prévention du cancer de la prostate par l'alimentation",
        category: "nutrition",
        duration: "14:15",
        thumbnail: "/prostate-health-nutrition.jpg",
        views: "12.9k",
        trending: false,
        description: "Les aliments protecteurs pour la santé prostatique",
      },
      {
        id: 204,
        title: "Facteurs de risque du cancer testiculaire",
        category: "prevention",
        duration: "8:40",
        thumbnail: "/testicular-cancer-risk.jpg",
        views: "9.7k",
        trending: false,
        description: "Qui est à risque et comment se protéger",
      },
    ]

    return userProfile.gender === "female" 
      ? [...commonVideos, ...femaleVideos]
      : [...commonVideos, ...maleVideos]
  }

  const videos = getVideos()

  const filteredVideos = videos.filter((video) => {
    const matchesCategory = selectedCategory === "all" || video.category === selectedCategory
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Vidéo mise en avant
  const featuredVideo = userProfile.gender === "female"
    ? {
        title: "Prévention du cancer du sein : ce que toute femme doit savoir",
        description: "Une présentation complète des facteurs de risque, des gestes de prévention et des dépistages recommandés pour le cancer du sein.",
        duration: "22:45",
        expert: "Dr. Marie Dupont - Oncologue",
        views: "45.2k"
      }
    : {
        title: "Santé masculine : prévention des cancers chez l'homme",
        description: "Guide complet de prévention des cancers les plus fréquents chez l'homme : prostate, testicules, colorectal.",
        duration: "24:30",
        expert: "Dr. Pierre Martin - Urologue",
        views: "38.7k"
      }

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-primary/10">
            <Video className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Vidéos de prévention</h2>
            <p className="text-muted-foreground">
              Informations et conseils pour rester en bonne santé
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher une vidéo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="whitespace-nowrap"
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Video */}
      {selectedCategory === "all" && !searchQuery && (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
          <div className="relative aspect-video bg-linear-to-br from-primary/20 to-accent/20">
            <img 
              src={userProfile.gender === "female" 
                ? "/featured-breast-prevention.jpg" 
                : "/featured-male-health.jpg"
              } 
              alt="Featured" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-primary ml-1" />
              </div>
            </div>
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                <Shield className="w-3 h-3" />
                <span>À voir absolument</span>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 px-2 py-1 rounded bg-black/70 text-white text-sm font-medium">
              {featuredVideo.duration}
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              {featuredVideo.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {featuredVideo.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{featuredVideo.expert}</span>
              <span>•</span>
              <span>{featuredVideo.views} vues</span>
              <span>•</span>
              <span>Nouveau</span>
            </div>
          </div>
        </Card>
      )}

      {/* Videos Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVideos.map((video) => (
          <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="relative aspect-video bg-linear-to-br from-primary/10 to-accent/10">
              <img
                src={video.thumbnail || "/placeholder.svg"}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-primary ml-1" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-white text-xs font-medium flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {video.duration}
              </div>
              {video.trending && (
                <div className="absolute top-2 left-2">
                  <div className="flex items-center gap-1 px-2 py-1 rounded bg-primary/90 text-primary-foreground text-xs font-medium">
                    <TrendingUp className="w-3 h-3" />
                    <span>Populaire</span>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2">
                {categories.find((c) => c.id === video.category)?.label}
              </div>
              <h4 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {video.title}
              </h4>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                {video.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{video.views} vues</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <Card className="p-12 text-center">
          <Video className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Aucune vidéo trouvée</h3>
          <p className="text-muted-foreground">
            Essayez de modifier vos critères de recherche ou de sélectionner une autre catégorie.
          </p>
        </Card>
      )}
    </div>
  )
}

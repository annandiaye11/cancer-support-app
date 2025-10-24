"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Video, Play, TrendingUp } from "lucide-react"

interface VideosSectionProps {
  userProfile: {
    gender: "male" | "female"
    mode: "preventive" | "curative"
  }
}

export function VideosSection({ userProfile }: VideosSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", label: "Toutes" },
    { id: "expert", label: "Experts" },
    { id: "testimony", label: "Témoignages" },
    { id: "exercise", label: "Exercices" },
    { id: "nutrition", label: "Nutrition" },
  ]

  const videos = [
    {
      id: 1,
      title: "Interview : Oncologue explique les nouveaux traitements",
      category: "expert",
      duration: "18:32",
      thumbnail: "/doctor-medical-interview.jpg",
      views: "12.5k",
      trending: true,
    },
    {
      id: 2,
      title: "Mon parcours de guérison - Témoignage de Marie",
      category: "testimony",
      duration: "15:20",
      thumbnail: "/woman-smiling-hopeful.jpg",
      views: "8.2k",
      trending: true,
    },
    {
      id: 3,
      title: "Yoga doux pour patients en traitement",
      category: "exercise",
      duration: "22:15",
      thumbnail: "/yoga-gentle-exercise.jpg",
      views: "15.8k",
      trending: false,
    },
    {
      id: 4,
      title: "Recettes anti-inflammatoires faciles",
      category: "nutrition",
      duration: "12:45",
      thumbnail: "/healthy-cooking-colorful-food.jpg",
      views: "9.3k",
      trending: true,
    },
    {
      id: 5,
      title: "Comprendre l'immunothérapie en 10 minutes",
      category: "expert",
      duration: "10:28",
      thumbnail: "/medical-science-laboratory.jpg",
      views: "18.7k",
      trending: false,
    },
    {
      id: 6,
      title: "Exercices de respiration pour gérer l'anxiété",
      category: "exercise",
      duration: "8:15",
      thumbnail: "/person-breathing-meditation.jpg",
      views: "11.2k",
      trending: false,
    },
  ]

  const filteredVideos = videos.filter((video) => {
    const matchesCategory = selectedCategory === "all" || video.category === selectedCategory
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-accent/10">
            <Video className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Vidéos</h2>
            <p className="text-muted-foreground">Contenus éducatifs et inspirants</p>
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
          <div className="relative aspect-video bg-gradient-to-br from-accent/20 to-primary/20">
            <img src="/featured-medical-video-thumbnail.jpg" alt="Featured" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-primary ml-1" />
              </div>
            </div>
            <div className="absolute top-4 left-4">
              <div className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium">
                Nouveau
              </div>
            </div>
            <div className="absolute bottom-4 right-4 px-2 py-1 rounded bg-black/70 text-white text-sm font-medium">
              25:40
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              Conférence : Les progrès de la médecine personnalisée
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Une présentation complète des avancées en médecine personnalisée et comment elles révolutionnent le
              traitement du cancer.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Dr. Sophie Martin</span>
              <span>•</span>
              <span>22.4k vues</span>
              <span>•</span>
              <span>Il y a 2 jours</span>
            </div>
          </div>
        </Card>
      )}

      {/* Videos Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVideos.map((video) => (
          <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-accent/10">
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
              <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-white text-xs font-medium">
                {video.duration}
              </div>
              {video.trending && (
                <div className="absolute top-2 left-2">
                  <div className="flex items-center gap-1 px-2 py-1 rounded bg-accent/90 text-accent-foreground text-xs font-medium">
                    <TrendingUp className="w-3 h-3" />
                    <span>Tendance</span>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="inline-block px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium mb-2">
                {categories.find((c) => c.id === video.category)?.label}
              </div>
              <h4 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {video.title}
              </h4>
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

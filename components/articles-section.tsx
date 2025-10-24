"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, Clock, TrendingUp } from "lucide-react"

interface ArticlesSectionProps {
  userProfile: {
    gender: "male" | "female"
    mode: "preventive" | "curative"
  }
}

export function ArticlesSection({ userProfile }: ArticlesSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", label: "Tous" },
    { id: "prevention", label: "Prévention" },
    { id: "nutrition", label: "Nutrition" },
    { id: "treatment", label: "Traitements" },
    { id: "wellness", label: "Bien-être" },
  ]

  const articles = [
    {
      id: 1,
      title: "Les aliments anti-cancer à privilégier",
      category: "nutrition",
      readTime: "8 min",
      image: "/healthy-food-colorful-vegetables.jpg",
      excerpt: "Découvrez les aliments riches en antioxydants qui peuvent aider à réduire les risques de cancer.",
      trending: true,
    },
    {
      id: 2,
      title: "Comprendre les différents types de dépistage",
      category: "prevention",
      readTime: "12 min",
      image: "/medical-screening-healthcare.jpg",
      excerpt: "Un guide complet sur les examens de dépistage recommandés selon votre âge et votre profil.",
      trending: false,
    },
    {
      id: 3,
      title: "Gérer la fatigue pendant le traitement",
      category: "treatment",
      readTime: "6 min",
      image: "/person-resting-peaceful.jpg",
      excerpt: "Des conseils pratiques pour mieux gérer la fatigue liée aux traitements oncologiques.",
      trending: true,
    },
    {
      id: 4,
      title: "Méditation et cancer : les bienfaits prouvés",
      category: "wellness",
      readTime: "10 min",
      image: "/peaceful-nature-meditation.png",
      excerpt: "Comment la méditation peut améliorer votre qualité de vie pendant et après le traitement.",
      trending: false,
    },
    {
      id: 5,
      title: "L'importance de l'activité physique",
      category: "prevention",
      readTime: "7 min",
      image: "/people-exercising-outdoor.jpg",
      excerpt: "Pourquoi bouger régulièrement est essentiel pour la prévention et la récupération.",
      trending: true,
    },
    {
      id: 6,
      title: "Communiquer avec son équipe médicale",
      category: "treatment",
      readTime: "9 min",
      image: "/doctor-patient-conversation.png",
      excerpt: "Les bonnes questions à poser et comment établir une relation de confiance avec vos soignants.",
      trending: false,
    },
  ]

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-primary/10">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Articles</h2>
            <p className="text-muted-foreground">Informations fiables et actualisées</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher un article..."
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

      {/* Featured Article */}
      {selectedCategory === "all" && !searchQuery && (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
          <div className="md:flex">
            <div className="md:w-2/5 aspect-video md:aspect-auto bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <img src="/featured-health-article-hero.jpg" alt="Featured" className="w-full h-full object-cover" />
            </div>
            <div className="p-6 md:w-3/5">
              <div className="flex items-center gap-2 mb-3">
                <div className="inline-block px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                  À la une
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="w-3 h-3" />
                  <span>Tendance</span>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                Les dernières avancées dans la recherche contre le cancer
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Découvrez les innovations récentes qui transforment la prise en charge et le traitement du cancer. Des
                thérapies ciblées aux immunothérapies, un tour d'horizon complet des progrès scientifiques.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>15 min</span>
                </div>
                <span>•</span>
                <span>Mis à jour aujourd'hui</span>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredArticles.map((article) => (
          <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
              <img
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {categories.find((c) => c.id === article.category)?.label}
                </div>
                {article.trending && (
                  <div className="flex items-center gap-1 text-xs text-accent">
                    <TrendingUp className="w-3 h-3" />
                  </div>
                )}
              </div>
              <h4 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {article.title}
              </h4>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{article.excerpt}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{article.readTime} de lecture</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <Card className="p-12 text-center">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Aucun article trouvé</h3>
          <p className="text-muted-foreground">
            Essayez de modifier vos critères de recherche ou de sélectionner une autre catégorie.
          </p>
        </Card>
      )}
    </div>
  )
}

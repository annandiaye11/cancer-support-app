"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, Clock, TrendingUp, Eye, Heart } from "lucide-react"
import { useArticles } from "@/hooks/useApi"
import type { Article } from "@/hooks/useApi"
import Link from "next/link"
import Image from "next/image"

export function ArticlesSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [page, setPage] = useState(1)

  // Debounce pour la recherche
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Reset page when filters change
  useEffect(() => {
    setPage(1)
  }, [selectedCategory, debouncedSearchQuery])

  // Utiliser le vrai hook API avec les filtres
  const { articles, pagination, loading, error, refetch } = useArticles({
    ...(selectedCategory && { category: selectedCategory }),
    ...(debouncedSearchQuery && { search: debouncedSearchQuery }),
    page,
    limit: 12
  })

  const filteredArticles = articles || []
  const featuredArticles = filteredArticles.filter((article: Article) => article.isFeatured)

  const categories = [
    { id: "", label: "Tous" },
    { id: "Nutrition", label: "Nutrition" },
    { id: "Prévention", label: "Prévention" },
    { id: "Bien-être", label: "Bien-être" },
    { id: "Activité physique", label: "Activité physique" },
    { id: "Traitement", label: "Traitement" },
    { id: "Support", label: "Support" },
  ]

  const handleSearch = () => {
    // La recherche se fait automatiquement via le debounce
    setPage(1)
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setPage(1)
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Erreur lors du chargement des articles: {error}</p>
        <Button onClick={refetch} className="mt-4">Réessayer</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-primary/10">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Articles</h2>
            <p className="text-muted-foreground">Ressources et conseils pour votre santé</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un article..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={handleSearch}>Rechercher</Button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange(category.id)}
              className="whitespace-nowrap"
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Articles Grid */}
      {!loading && filteredArticles.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article: Article) => (
            <Link key={article._id} href={`/articles/${article.slug}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group h-full">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.image || "/placeholder.jpg"}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {article.isFeatured && (
                    <Badge className="absolute top-2 left-2 bg-primary/90">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      À la une
                    </Badge>
                  )}
                </div>
                
                <div className="p-4 flex flex-col h-[calc(100%-12rem)]">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">
                      {article.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {article.readTime} min
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4 grow">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                    <div className="flex items-center gap-2">
                      <span>{article.author.name}</span>
                      <span>•</span>
                      <span>{article.author.role}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {article.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {article.likes}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && articles.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Aucun article trouvé</h3>
          <p className="text-muted-foreground">
            {searchQuery || selectedCategory 
              ? "Essayez de modifier vos critères de recherche"
              : "Aucun article disponible pour le moment"
            }
          </p>
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <Button
            variant="outline"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Précédent
          </Button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
              const pageNum = i + 1
              return (
                <Button
                  key={pageNum}
                  variant={page === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPage(pageNum)}
                >
                  {pageNum}
                </Button>
              )
            })}
          </div>
          
          <Button
            variant="outline"
            onClick={() => setPage(page + 1)}
            disabled={page === pagination.totalPages}
          >
            Suivant
          </Button>
        </div>
      )}
    </div>
  )
}

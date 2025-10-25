'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, BookOpen, Clock, TrendingUp, Eye, Heart, Filter } from 'lucide-react'
import { useArticles } from '@/hooks/useApi'
import type { Article } from '@/hooks/useApi'
import Link from 'next/link'
import Image from 'next/image'

export default function GuidesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 9

  const { articles, loading, error, pagination } = useArticles({
    search: searchQuery,
    category: selectedCategory === "all" ? undefined : selectedCategory,
    page: currentPage,
    limit: articlesPerPage
  })

  const categories = [
    { value: "all", label: "Tous les guides", count: 25 },
    { value: "Nutrition", label: "Nutrition", count: 8 },
    { value: "Prévention", label: "Prévention", count: 6 },
    { value: "Bien-être", label: "Bien-être", count: 5 },
    { value: "Activité physique", label: "Activité physique", count: 4 },
    { value: "Traitement", label: "Traitement", count: 7 },
    { value: "Support", label: "Support", count: 3 }
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardContent>
            <h2 className="text-xl font-semibold text-red-600 mb-2">Erreur de chargement</h2>
            <p className="text-gray-600">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto p-4 pt-8">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Guides & <span className="text-pink-600">Ressources</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos guides complets pour vous accompagner à chaque étape de votre parcours de soins
          </p>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Barre de recherche */}
            <div className="relative flex-1 w-full lg:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher dans les guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Filtres de catégorie */}
            <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-center lg:justify-start">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedCategory(category.value)
                    setCurrentPage(1)
                  }}
                  className="flex items-center gap-2"
                >
                  <Filter className="w-3 h-3" />
                  {category.label}
                  <Badge variant="secondary" className="ml-1">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <BookOpen className="w-8 h-8 mx-auto text-pink-600 mb-2" />
              <p className="text-2xl font-bold text-gray-900">25</p>
              <p className="text-gray-600 text-sm">Guides disponibles</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 mx-auto text-green-600 mb-2" />
              <p className="text-2xl font-bold text-gray-900">12K</p>
              <p className="text-gray-600 text-sm">Lectures ce mois</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Eye className="w-8 h-8 mx-auto text-blue-600 mb-2" />
              <p className="text-2xl font-bold text-gray-900">156K</p>
              <p className="text-gray-600 text-sm">Vues totales</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="w-8 h-8 mx-auto text-red-600 mb-2" />
              <p className="text-2xl font-bold text-gray-900">2.8K</p>
              <p className="text-gray-600 text-sm">Guides favoris</p>
            </CardContent>
          </Card>
        </div>

        {/* Liste des articles */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: articlesPerPage }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {articles.map((article: Article) => (
                <Link key={article._id} href={`/articles/${article.slug}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                    <div className="relative h-48">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                      {article.isFeatured && (
                        <Badge className="absolute top-3 left-3 bg-pink-600">
                          ⭐ Populaire
                        </Badge>
                      )}
                      <Badge 
                        variant="secondary" 
                        className="absolute top-3 right-3 bg-white/90 text-gray-700"
                      >
                        {article.category}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight">
                          {article.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{article.readTime} min</span>
                          </div>
                          <span>{formatDate(article.publishedAt)}</span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 border-t">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{article.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            <span>{article.likes}</span>
                          </div>
                          <div className="flex-1 text-right">
                            <span className="font-medium">{article.author.name}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={!pagination.hasPrev}
                >
                  Précédent
                </Button>
                
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    const pageNumber = Math.max(1, Math.min(
                      pagination.totalPages - 4,
                      Math.max(1, currentPage - 2)
                    )) + i
                    
                    if (pageNumber > pagination.totalPages) return null
                    
                    return (
                      <Button
                        key={pageNumber}
                        variant={currentPage === pageNumber ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNumber)}
                      >
                        {pageNumber}
                      </Button>
                    )
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(pagination.totalPages, currentPage + 1))}
                  disabled={!pagination.hasNext}
                >
                  Suivant
                </Button>
              </div>
            )}

            {articles.length === 0 && !loading && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun guide trouvé</h3>
                <p className="text-gray-600">
                  {searchQuery || selectedCategory !== "all"
                    ? "Essayez de modifier vos critères de recherche"
                    : "Aucun guide n'est disponible pour le moment"}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

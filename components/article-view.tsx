"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Clock, Calendar, Share2, Bookmark, Heart, TrendingUp, User } from "lucide-react"

interface Article {
  id: number
  title: string
  category: string
  readTime: string
  image: string
  excerpt: string
  content: string
  author: {
    name: string
    role: string
    avatar?: string
  }
  publishedDate: string
  trending?: boolean
  tags?: string[]
}

interface ArticleViewProps {
  article: Article
  onBack: () => void
}

export function ArticleView({ article, onBack }: ArticleViewProps) {
  return (
    <div className="min-h-screen pb-20 md:pb-6">
      {/* Header avec bouton retour */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border mb-6">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour aux articles
          </Button>
        </div>
      </div>

      {/* Contenu de l'article */}
      <article className="container mx-auto px-4 max-w-4xl">
        {/* Image principale */}
        <div className="aspect-video md:aspect-21/9 rounded-xl overflow-hidden mb-6 bg-linear-to-br from-primary/10 to-accent/10">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Métadonnées */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            {article.category}
          </div>
          {article.trending && (
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>Tendance</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{article.readTime} de lecture</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{article.publishedDate}</span>
          </div>
        </div>

        {/* Titre */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
          {article.title}
        </h1>

        {/* Excerpt */}
        <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
          {article.excerpt}
        </p>

        {/* Auteur */}
        <div className="flex items-center justify-between mb-8 pb-8 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              {article.author.avatar ? (
                <img src={article.author.avatar} alt={article.author.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="w-6 h-6 text-primary" />
              )}
            </div>
            <div>
              <div className="font-semibold text-foreground">{article.author.name}</div>
              <div className="text-sm text-muted-foreground">{article.author.role}</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bookmark className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="prose prose-lg max-w-none mb-8">
          <div 
            className="text-foreground leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm hover:bg-muted/80 cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Articles suggérés */}
        <Card className="p-6 bg-muted/50">
          <h3 className="text-xl font-bold text-foreground mb-4">Articles similaires</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex gap-3 p-3 rounded-lg hover:bg-background cursor-pointer transition-colors group"
              >
                <div className="w-20 h-20 shrink-0 rounded-lg bg-primary/10 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=200"
                    alt="Article"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors mb-1">
                    Titre de l'article suggéré {i}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>5 min</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </article>
    </div>
  )
}

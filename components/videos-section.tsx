'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Play, Clock, Eye, Heart, Share2, X } from 'lucide-react'
import Image from 'next/image'
import { useVideos } from '@/hooks/useApi'
import { useState } from 'react'

export function VideosSection() {
  // Utiliser le vrai hook API
  const { videos, loading, error } = useVideos()
  const [selectedVideo, setSelectedVideo] = useState<any>(null)
  const [isPlayerOpen, setIsPlayerOpen] = useState(false)

  const playVideo = (video: any) => {
    setSelectedVideo(video)
    setIsPlayerOpen(true)
  }

  const closePlayer = () => {
    setIsPlayerOpen(false)
    setSelectedVideo(null)
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  if (loading) {
    return (
      <div className="space-y-6 pb-20 md:pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-full" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Erreur lors du chargement des vidéos</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* En vedette */}
      {videos.length > 0 && (
        <Card className="overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative aspect-video lg:aspect-square">
              <Image
                src={videos[0].thumbnail}
                alt={videos[0].title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Button 
                  size="lg" 
                  className="rounded-full"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    playVideo(videos[0])
                  }}
                >
                  <Play className="w-6 h-6 mr-2" />
                  Regarder maintenant
                </Button>
              </div>
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="bg-red-500 text-white">
                  En vedette
                </Badge>
              </div>
              <div className="absolute bottom-4 left-4 text-white text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {formatDuration(videos[0].duration)}
                </div>
              </div>
            </div>
            <div className="p-6 flex flex-col justify-center">
              <div className="space-y-4">
                <div>
                  <Badge variant="outline" className="mb-2">
                    {videos[0].category}
                  </Badge>
                  <h2 className="text-2xl font-bold">{videos[0].title}</h2>
                </div>
                <p className="text-muted-foreground">
                  {videos[0].description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {videos[0].views.toLocaleString()} vues
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {videos[0].likes}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      playVideo(videos[0])
                    }}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Regarder
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Grille de vidéos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.slice(1).map((video) => (
          <Card 
            key={video._id} 
            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              playVideo(video)
            }}
          >
            <div className="relative aspect-video">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-all">
                <Button 
                  size="sm" 
                  className="rounded-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    playVideo(video)
                  }}
                >
                  <Play className="w-4 h-4" />
                </Button>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {formatDuration(video.duration)}
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                <Badge variant="outline" className="text-xs">
                  {video.category}
                </Badge>
                <h3 className="font-semibold text-sm line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {video.description}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {video.views.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {video.likes}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Lecteur vidéo intégré */}
      <Dialog open={isPlayerOpen} onOpenChange={setIsPlayerOpen}>
        <DialogContent className="max-w-4xl w-full p-0" aria-describedby="video-description">
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl font-bold">
                  {selectedVideo?.title}
                </DialogTitle>
                <Badge variant="outline" className="mt-2">
                  {selectedVideo?.category}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={closePlayer}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          
          {selectedVideo && (
            <div className="px-6 pb-6">
              {/* Lecteur vidéo de démonstration */}
              <div className="aspect-video w-full mb-4 bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 to-purple-600/20"></div>
                <div className="text-center text-white z-10">
                  <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Contenu Vidéo Éducatif</h3>
                  <p className="text-sm opacity-90 max-w-md mx-auto">
                    Cette vidéo contient des informations importantes sur {selectedVideo.category.toLowerCase()}. 
                    Dans un environnement de production, le contenu vidéo serait diffusé ici.
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-4 text-sm">
                    <span className="bg-white/20 px-3 py-1 rounded">
                      Durée: {formatDuration(selectedVideo.duration)}
                    </span>
                    <span className="bg-white/20 px-3 py-1 rounded">
                      {selectedVideo.category}
                    </span>
                  </div>
                </div>
                
                {/* Simulation d'une barre de progression */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                  <div className="h-full bg-red-500 w-1/3"></div>
                </div>
              </div>
              
              {/* Informations de la vidéo */}
              <div id="video-description" className="space-y-4">
                <p className="text-muted-foreground">
                  {selectedVideo.description}
                </p>
                
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {formatDuration(selectedVideo.duration)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {selectedVideo.views?.toLocaleString()} vues
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {selectedVideo.likes}
                  </div>
                </div>
                
                {selectedVideo.author && (
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {selectedVideo.author.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{selectedVideo.author.name}</p>
                      <p className="text-xs text-muted-foreground">{selectedVideo.author.role}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}


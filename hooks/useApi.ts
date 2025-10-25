import { useState, useEffect } from 'react'

// Types pour les données
export interface Article {
  _id: string
  title: string
  excerpt: string
  content: string
  image: string
  slug: string
  category: string
  tags?: string[]
  readTime: number
  publishedAt: string
  author: {
    name: string
    role: string
  }
  isFeatured: boolean
  views: number
  likes: number
}

interface Video {
  _id: string
  title: string
  description: string
  thumbnail: string
  url: string
  duration: string
  category: string
  publishedAt: string
  views: number
  likes: number
}

interface UserProfile {
  _id: string
  name: string
  email: string
  avatar: string
  joinedAt: string
  preferences: {
    notifications: boolean
    language: string
  }
}

interface HomeStats {
  totalArticles: number
  totalVideos: number
  completedTasks: number
  upcomingAppointments: number
  featuredArticles?: number
  recentArticles?: number
  totalArticlesRead?: number
  screeningsDue?: number
  healthScore?: number
  recommendations?: Array<{
    title: string
    description: string
    action: string
    priority: 'high' | 'medium' | 'low'
  }>
  lastUpdate?: string
}

interface UserPreferences {
  notifications: boolean
  emailUpdates: boolean
  language: string
  theme: string
  screeningReminders: string
  contentPreferences: string[]
}

// Données mock pour simuler la base de données
const mockArticles: Article[] = [
  {
    _id: "1",
    title: "Guide complet de l'alimentation pendant le traitement du cancer",
    excerpt: "Découvrez les meilleures pratiques nutritionnelles pour maintenir votre force et votre énergie pendant le traitement.",
    content: "Un guide détaillé sur l'alimentation pendant le traitement du cancer...",
    image: "/healthy-food-nutrition.png",
    slug: "alimentation-traitement-cancer",
    category: "Nutrition",
    readTime: 8,
    publishedAt: "2024-10-20T10:00:00Z",
    author: {
      name: "Dr. Marie Dubois",
      role: "Oncologue nutritionniste"
    },
    isFeatured: true,
    views: 1247,
    likes: 89
  },
  {
    _id: "2",
    title: "Prévention du cancer : 10 habitudes à adopter dès maintenant",
    excerpt: "Les habitudes de vie simples qui peuvent réduire significativement vos risques de développer un cancer.",
    content: "Les 10 habitudes préventives essentielles...",
    image: "/healthy-lifestyle-prevention.jpg",
    slug: "prevention-cancer-10-habitudes",
    category: "Prévention",
    readTime: 6,
    publishedAt: "2024-10-18T09:30:00Z",
    author: {
      name: "Dr. Alioune Badara",
      role: "Médecin préventeur"
    },
    isFeatured: true,
    views: 2134,
    likes: 156
  },
  {
    _id: "3",
    title: "Techniques de relaxation pour gérer l'anxiété liée au cancer",
    excerpt: "Apprenez des techniques simples et efficaces pour réduire le stress et l'anxiété pendant votre parcours de soins.",
    content: "Guide pratique des techniques de relaxation...",
    image: "/peaceful-nature-meditation.png",
    slug: "relaxation-anxiete-cancer",
    category: "Bien-être",
    readTime: 5,
    publishedAt: "2024-10-15T14:20:00Z",
    author: {
      name: "Aminata Fall",
      role: "Psycho-oncologue"
    },
    isFeatured: false,
    views: 892,
    likes: 67
  },
  {
    _id: "4",
    title: "Exercices adaptés pendant et après le traitement du cancer",
    excerpt: "Un programme d'exercices doux et adaptés pour maintenir votre forme physique en toute sécurité.",
    content: "Programme d'exercices adapté aux patients...",
    image: "/yoga-gentle-exercise.jpg",
    slug: "exercices-traitement-cancer",
    category: "Activité physique",
    readTime: 7,
    publishedAt: "2024-10-12T11:45:00Z",
    author: {
      name: "Marc Dupont",
      role: "Kinésithérapeute spécialisé"
    },
    isFeatured: false,
    views: 756,
    likes: 45
  },
  {
    _id: "5",
    title: "Comprendre les effets secondaires de la chimiothérapie",
    excerpt: "Guide complet pour anticiper et gérer les effets secondaires les plus courants de la chimiothérapie.",
    content: "Informations détaillées sur les effets secondaires...",
    image: "/medical-science-laboratory.jpg",
    slug: "effets-secondaires-chimiotherapie",
    category: "Traitement",
    readTime: 9,
    publishedAt: "2024-10-10T16:00:00Z",
    author: {
      name: "Dr. Anne Moreau",
      role: "Oncologue médicale"
    },
    isFeatured: false,
    views: 1567,
    likes: 112
  },
  {
    _id: "6",
    title: "Comment parler de votre cancer à vos proches",
    excerpt: "Conseils pratiques pour communiquer efficacement avec votre famille et vos amis sur votre diagnostic.",
    content: "Guide de communication avec les proches...",
    image: "/doctor-patient-conversation.png",
    slug: "parler-cancer-proches",
    category: "Support",
    readTime: 6,
    publishedAt: "2024-10-08T13:15:00Z",
    author: {
      name: "Claire Petit",
      role: "Assistante sociale"
    },
    isFeatured: false,
    views: 1023,
    likes: 78
  }
]

const mockVideos: Video[] = [
  {
    _id: "1",
    title: "Témoignage : Ma vie après le cancer du sein",
    description: "Marie partage son parcours de rémission et ses conseils pour retrouver confiance en soi.",
    thumbnail: "/woman-smiling-hopeful.jpg",
    url: "#",
    duration: "12:34",
    category: "Témoignages",
    publishedAt: "2024-10-19T10:00:00Z",
    views: 3245,
    likes: 287
  },
  {
    _id: "2",
    title: "Exercices de respiration pour réduire l'anxiété",
    description: "Apprenez des techniques de respiration simples et efficaces avec notre thérapeute.",
    thumbnail: "/person-breathing-meditation.jpg",
    url: "#",
    duration: "8:45",
    category: "Bien-être",
    publishedAt: "2024-10-17T15:30:00Z",
    views: 1876,
    likes: 154
  }
]

const mockUserProfile: UserProfile = {
  _id: "user123",
  name: "Marie Dupont",
  email: "marie.dupont@email.com",
  avatar: "/placeholder-user.jpg",
  joinedAt: "2024-03-15T09:00:00Z",
  preferences: {
    notifications: true,
    language: "fr"
  }
}

const mockHomeStats: HomeStats = {
  totalArticles: 6,
  totalVideos: 2,
  completedTasks: 8,
  upcomingAppointments: 2
}

// Hook pour récupérer les articles avec filtres
export function useArticles(filters: {
  category?: string
  search?: string
  featured?: boolean
  limit?: number
  offset?: number
} = {}) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        
        // Construire l'URL avec les paramètres de requête
        const params = new URLSearchParams()
        if (filters.category && filters.category !== 'all') params.append('category', filters.category)
        if (filters.search) params.append('search', filters.search)
        if (filters.featured !== undefined) params.append('featured', filters.featured.toString())
        if (filters.limit) params.append('limit', filters.limit.toString())
        if (filters.offset) params.append('offset', filters.offset.toString())
        
        const url = `/api/articles?${params.toString()}`
        const response = await fetch(url)
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des articles')
        }
        
        const data = await response.json()
        
        // L'API peut retourner plusieurs formats :
        // 1. { data: articles, pagination: { total, ... } }
        // 2. { articles, total }
        // 3. Directement un tableau
        if (Array.isArray(data)) {
          setArticles(data)
          setTotal(data.length)
        } else if (data.data) {
          // Format avec data et pagination
          setArticles(data.data)
          setTotal(data.pagination?.total || data.data.length)
        } else {
          // Format avec articles et total
          setArticles(data.articles || data)
          setTotal(data.total || data.length || 0)
        }
        
        setError(null)
      } catch (err) {
        console.error('Error fetching articles:', err)
        setError('Erreur lors du chargement des articles')
        // Fallback sur les données mock en cas d'erreur
        let filteredArticles = [...mockArticles]
        
        // Appliquer les filtres sur les données mock
        if (filters.category && filters.category !== 'all') {
          filteredArticles = filteredArticles.filter(article => 
            article.category.toLowerCase() === filters.category?.toLowerCase()
          )
        }
        
        if (filters.search) {
          const searchTerm = filters.search.toLowerCase()
          filteredArticles = filteredArticles.filter(article =>
            article.title.toLowerCase().includes(searchTerm) ||
            article.excerpt.toLowerCase().includes(searchTerm) ||
            article.content.toLowerCase().includes(searchTerm)
          )
        }
        
        if (filters.featured !== undefined) {
          filteredArticles = filteredArticles.filter(article => 
            article.isFeatured === filters.featured
          )
        }
        
        filteredArticles.sort((a, b) => 
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        )
        
        setTotal(filteredArticles.length)
        
        if (filters.offset !== undefined) {
          const start = filters.offset
          const end = filters.limit ? start + filters.limit : undefined
          filteredArticles = filteredArticles.slice(start, end)
        } else if (filters.limit) {
          filteredArticles = filteredArticles.slice(0, filters.limit)
        }
        
        setArticles(filteredArticles)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [filters.category, filters.search, filters.featured, filters.limit, filters.offset])

  return { articles, loading, error, total }
}

// Hook pour récupérer les vidéos
export function useVideos(filters: {
  category?: string
  search?: string
  featured?: boolean
  limit?: number
  offset?: number
} = {}) {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true)
        
        // Construire l'URL avec les paramètres de requête
        const params = new URLSearchParams()
        if (filters.category && filters.category !== 'all') params.append('category', filters.category)
        if (filters.search) params.append('search', filters.search)
        if (filters.featured !== undefined) params.append('featured', filters.featured.toString())
        if (filters.limit) params.append('limit', filters.limit.toString())
        if (filters.offset) params.append('offset', filters.offset.toString())
        
        const url = `/api/videos?${params.toString()}`
        const response = await fetch(url)
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des vidéos')
        }
        
        const data = await response.json()
        
        // L'API peut retourner plusieurs formats :
        // 1. { data: videos, pagination: { total, ... } }
        // 2. { videos, total }
        // 3. Directement un tableau
        if (Array.isArray(data)) {
          setVideos(data)
          setTotal(data.length)
        } else if (data.data) {
          // Format avec data et pagination
          setVideos(data.data)
          setTotal(data.pagination?.total || data.data.length)
        } else {
          // Format avec videos et total
          setVideos(data.videos || data)
          setTotal(data.total || data.length || 0)
        }
        
        setError(null)
      } catch (err) {
        console.error('Error fetching videos:', err)
        setError('Erreur lors du chargement des vidéos')
        // Fallback sur les données mock en cas d'erreur
        setVideos(mockVideos)
        setTotal(mockVideos.length)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [filters.category, filters.search, filters.featured, filters.limit, filters.offset])

  return { videos, loading, error, total }
}

// Hook pour récupérer les statistiques de la page d'accueil
export function useHomeStats(userId?: string, isLoadingUserId?: boolean) {
  const [stats, setStats] = useState<HomeStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Ne pas charger les stats tant que l'userId n'est pas prêt
    if (isLoadingUserId) {
      console.log('⏳ useHomeStats - Attente du chargement de userId...')
      return
    }

    // Ne pas charger si userId est undefined ou null
    if (userId === undefined || userId === null) {
      console.log('⚠️ useHomeStats - userId non défini, skip du chargement')
      setLoading(false)
      return
    }

    const fetchStats = async () => {
      try {
        setLoading(true)
        
        console.log('📊 useHomeStats - Chargement des stats pour userId:', userId)
        
        // Appel à l'API réelle avec userId
        const url = `/api/stats?userId=${userId}`
        
        const response = await fetch(url)
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des statistiques')
        }
        
        const data = await response.json()
        console.log('✅ useHomeStats - Stats chargées:', data)
        setStats(data)
        setError(null)
      } catch (err) {
        console.error('❌ Error fetching stats:', err)
        setError('Erreur lors du chargement des statistiques')
        // Fallback sur les données mock en cas d'erreur
        setStats(mockHomeStats)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [userId, isLoadingUserId])

  return { stats, loading, error }
}

// Hook pour récupérer le profil utilisateur
export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        
        // Simulation d'un délai API
        await new Promise(resolve => setTimeout(resolve, 300))
        
        setProfile(mockUserProfile)
        setError(null)
      } catch (err) {
        setError('Erreur lors du chargement du profil')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  return { profile, loading, error }
}

// Hook pour récupérer les préférences utilisateur
export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        setLoading(true)
        
        // Simulation d'un délai API
        await new Promise(resolve => setTimeout(resolve, 250))
        
        setPreferences({
          notifications: true,
          emailUpdates: true,
          language: "fr",
          theme: "light",
          screeningReminders: "mensuel",
          contentPreferences: ["nutrition", "prévention", "bien-être"]
        })
        setError(null)
      } catch (err) {
        setError('Erreur lors du chargement des préférences')
      } finally {
        setLoading(false)
      }
    }

    fetchPreferences()
  }, [])

  return { preferences, loading, error }
}

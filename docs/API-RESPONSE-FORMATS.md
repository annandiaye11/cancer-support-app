# 📡 API Response Formats - Reference Guide

Documentation des formats de réponse de toutes les APIs de l'application.

---

## 📚 Articles API

### Endpoint
```
GET /api/articles
```

### Paramètres
- `category` (string, optional) - Filtrer par catégorie
- `search` (string, optional) - Recherche dans titre/excerpt/tags
- `featured` (boolean, optional) - Filtrer les articles en vedette
- `page` (number, default: 1) - Numéro de page
- `limit` (number, default: 10) - Nombre d'articles par page

### Format de réponse
```typescript
{
  data: Article[],
  pagination: {
    page: number,
    limit: number,
    total: number,
    totalPages: number,
    hasNext: boolean,
    hasPrev: boolean
  }
}
```

### Exemple
```json
{
  "data": [
    {
      "_id": "1",
      "title": "Les 10 habitudes pour réduire les risques de cancer",
      "slug": "10-habitudes-reduire-risques-cancer",
      "excerpt": "Découvrez les 10 habitudes essentielles...",
      "category": "Prévention",
      "readTime": 8,
      "isFeatured": true,
      "views": 1250,
      "likes": 89,
      "publishedAt": "2025-10-25T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 6,
    "totalPages": 1,
    "hasNext": false,
    "hasPrev": false
  }
}
```

---

## 🎥 Videos API

### Endpoint
```
GET /api/videos
```

### Paramètres
- `category` (string, optional) - Filtrer par catégorie
- `search` (string, optional) - Recherche dans titre/description
- `featured` (boolean, optional) - Filtrer les vidéos en vedette
- `limit` (number, optional) - Nombre de vidéos
- `offset` (number, optional) - Position de départ

### Format de réponse
```typescript
{
  videos: Video[],
  total: number
}
```

### Exemple
```json
{
  "videos": [
    {
      "_id": "1",
      "title": "Mon parcours : du diagnostic à la rémission",
      "description": "Une histoire inspirante de courage...",
      "thumbnail": "/woman-smiling-hopeful.jpg",
      "url": "#",
      "duration": "12:30",
      "category": "Témoignages",
      "views": 2450,
      "likes": 189,
      "publishedAt": "2024-10-20T14:00:00Z"
    }
  ],
  "total": 2
}
```

---

## 📊 Stats API

### Endpoint
```
GET /api/stats
```

### Paramètres
- `userId` (string, optional) - ID de l'utilisateur pour les stats personnalisées

### Format de réponse
```typescript
{
  totalArticles: number,
  totalVideos: number,
  completedTasks: number,
  upcomingAppointments: number,
  featuredArticles?: number,
  recentArticles?: number,
  lastUpdate?: string
}
```

### Exemple
```json
{
  "totalArticles": 3,
  "totalVideos": 2,
  "completedTasks": 0,
  "upcomingAppointments": 1,
  "featuredArticles": 1,
  "recentArticles": 0,
  "lastUpdate": "2025-10-25T13:52:37.138Z"
}
```

---

## 📅 Appointments API

### Endpoint
```
GET /api/appointments
```

### Paramètres
- `userId` (string, required) - ID de l'utilisateur
- `id` (string, optional) - ID d'un rendez-vous spécifique

### Format de réponse (liste)
```typescript
Appointment[]
```

### Exemple
```json
[
  {
    "_id": "67123abc...",
    "userId": "test-user-123",
    "date": "2025-11-15",
    "time": "14:30",
    "type": "consultation",
    "location": "Hôpital Central",
    "doctor": "Dr. Marie Dubois",
    "notes": "Consultation de suivi",
    "status": "confirmed",
    "createdAt": "2025-10-25T10:00:00.000Z",
    "updatedAt": "2025-10-25T10:00:00.000Z"
  }
]
```

### Format de réponse (détail unique)
```typescript
Appointment | null
```

---

## 🔧 Gestion des formats dans les hooks

### Hook useArticles
```typescript
// Supporte 3 formats :
// 1. Tableau direct : Article[]
// 2. { articles: Article[], total: number }
// 3. { data: Article[], pagination: { total, ... } }

const { articles, loading, error, total } = useArticles({ limit: 6 })
```

### Hook useVideos
```typescript
// Supporte 3 formats :
// 1. Tableau direct : Video[]
// 2. { videos: Video[], total: number }
// 3. { data: Video[], pagination: { total, ... } }

const { videos, loading, error, total } = useVideos({ category: 'Témoignages' })
```

### Hook useHomeStats
```typescript
// Format unique : HomeStats
const { stats, loading, error } = useHomeStats(userId)
```

---

## 📝 Conventions

### Statut des réponses
- `200` - Succès
- `400` - Requête invalide (paramètres manquants/incorrects)
- `404` - Ressource non trouvée
- `500` - Erreur serveur interne

### Gestion des erreurs
```typescript
{
  error: string  // Message d'erreur descriptif
}
```

### Dates
- Format ISO 8601 : `"2025-10-25T10:00:00.000Z"`
- Timezone : UTC

### Pagination
- `page` commence à 1 (pas 0)
- `limit` par défaut : 10
- `total` : nombre total d'éléments
- `totalPages` : `Math.ceil(total / limit)`

---

## 🚀 Bonnes pratiques

### 1. Toujours gérer le loading
```typescript
const { articles, loading } = useArticles()

if (loading) return <Spinner />
```

### 2. Toujours gérer les erreurs
```typescript
const { articles, error } = useArticles()

if (error) return <ErrorMessage message={error} />
```

### 3. Vérifier que les données sont un tableau
```typescript
if (!articles || !Array.isArray(articles)) return []
```

### 4. Utiliser les filtres côté API
```typescript
// ✅ BON : Filtrer côté API
const { articles } = useArticles({ category: 'Prévention' })

// ❌ MAUVAIS : Filtrer côté client après avoir tout récupéré
const { articles: all } = useArticles()
const filtered = all.filter(a => a.category === 'Prévention')
```

---

**Dernière mise à jour** : 25 octobre 2025  
**Version des APIs** : 1.0  
**Format** : JSON uniquement

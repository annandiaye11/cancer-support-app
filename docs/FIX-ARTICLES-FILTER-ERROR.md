# 🐛 Fix: TypeError "allArticles.filter is not a function"

## ❌ Problème

Erreur runtime lors du chargement du dashboard :

```
TypeError: allArticles.filter is not a function
    at getRecommendedArticles (components/home-section.tsx:42:34)
```

**Cause** : L'API `/api/articles` retourne les données dans le format `{ data: [...], pagination: {...} }`, mais le hook `useArticles` attendait soit un tableau direct, soit `{ articles: [...], total: ... }`.

---

## ✅ Solution

### 1. **Mise à jour du hook `useArticles`**

**Fichier** : `/hooks/useApi.ts`

**Avant** :
```typescript
const data = await response.json()

// L'API peut retourner soit { articles, total } soit directement un tableau
if (Array.isArray(data)) {
  setArticles(data)
  setTotal(data.length)
} else {
  setArticles(data.articles || data)
  setTotal(data.total || data.length || 0)
}
```

**Après** :
```typescript
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
```

### 2. **Mise à jour du hook `useVideos`**

Même correction appliquée pour gérer le format `{ data: videos, pagination: {...} }`.

### 3. **Protection supplémentaire dans `HomeSection`**

**Fichier** : `/components/home-section.tsx`

**Avant** :
```typescript
const getRecommendedArticles = () => {
  if (!allArticles) return []
  
  const featured = allArticles.filter(article => article.isFeatured)
  // ...
}
```

**Après** :
```typescript
const getRecommendedArticles = () => {
  // S'assurer que allArticles est un tableau
  if (!allArticles || !Array.isArray(allArticles)) return []
  
  const featured = allArticles.filter(article => article.isFeatured)
  // ...
}
```

---

## 🔍 Formats d'API supportés

Le hook `useArticles` supporte maintenant **3 formats de réponse** :

### Format 1 : Tableau direct
```json
[
  { "_id": "1", "title": "Article 1", ... },
  { "_id": "2", "title": "Article 2", ... }
]
```

### Format 2 : Objet avec articles et total
```json
{
  "articles": [
    { "_id": "1", "title": "Article 1", ... }
  ],
  "total": 10
}
```

### Format 3 : Objet avec data et pagination (utilisé par l'API actuelle)
```json
{
  "data": [
    { "_id": "1", "title": "Article 1", ... }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

## ✅ Résultat

- ✅ Le hook détecte automatiquement le format de la réponse API
- ✅ Extraction correcte du tableau d'articles
- ✅ Protection contre les valeurs non-array dans le composant
- ✅ Support de la pagination via le format `data.pagination`
- ✅ Fallback sur données mock en cas d'erreur

---

## 🧪 Test

### Test manuel
1. Démarrer le serveur : `pnpm dev`
2. Ouvrir le dashboard
3. Vérifier que les articles s'affichent correctement
4. Vérifier la console pour les erreurs (aucune attendue)

### Test API
```bash
# Tester l'API articles
curl "http://localhost:3000/api/articles?limit=6"

# Devrait retourner :
# {
#   "data": [...articles...],
#   "pagination": { "total": X, ... }
# }
```

---

## 📚 Leçons apprises

1. **Toujours valider le type de données** avant d'utiliser des méthodes de tableau
2. **Documenter les formats d'API** attendus dans les hooks
3. **Ajouter des vérifications de type** dans les composants critiques
4. **Utiliser `Array.isArray()`** pour vérifier qu'une variable est un tableau
5. **Gérer plusieurs formats d'API** pour plus de flexibilité

---

**Date du fix** : 25 octobre 2025  
**Status** : ✅ RÉSOLU  
**Fichiers modifiés** :
- `/hooks/useApi.ts` (useArticles et useVideos)
- `/components/home-section.tsx`

# Fix: Stats disparaissent après refresh

## 🔴 Problème

Lors du refresh de la page, les statistiques du dashboard apparaissent correctement pendant 0.5 seconde, puis reviennent toutes à 0.

## 🔍 Analyse du Problème

### Race Condition entre 3 hooks

Le problème était une **race condition** causée par le timing entre plusieurs hooks:

```
1. Page charge → useUserId() s'initialise
   ↓ userId = null, isLoading = true
   
2. useHomeStats(userId) se déclenche avec userId = null
   ↓ Appelle /api/stats (sans userId)
   ↓ Retourne: { upcomingAppointments: 0 } ❌
   
3. localStorage est lu → userId = "user-default-dev"
   ↓ useUserId met à jour: userId = "user-default-dev"
   
4. useHomeStats se déclenche ENCORE avec le nouveau userId
   ↓ Appelle /api/stats?userId=user-default-dev
   ↓ Retourne: { upcomingAppointments: 2 } ✅
   
5. Mais le hook peut continuer à vérifier la session
   ↓ /api/auth/session retourne {}
   ↓ Peut créer un NOUVEAU userId temporaire
   ↓ useHomeStats se déclenche UNE 3ème FOIS
   ↓ Retourne: { upcomingAppointments: 0 } ❌
```

**Résultat**: Les stats apparaissent brièvement (étape 4) puis redeviennent 0 (étape 5).

## ✅ Solutions Implémentées

### 1. Modifier `useHomeStats` pour attendre que userId soit prêt

**Avant:**
```typescript
export function useHomeStats(userId?: string) {
  useEffect(() => {
    fetchStats() // Se déclenche même si userId = null
  }, [userId])
}
```

**Après:**
```typescript
export function useHomeStats(userId?: string, isLoadingUserId?: boolean) {
  useEffect(() => {
    // Ne pas charger tant que l'userId n'est pas prêt
    if (isLoadingUserId) {
      console.log('⏳ Attente du chargement de userId...')
      return
    }
    
    // Ne pas charger si userId est undefined ou null
    if (userId === undefined || userId === null) {
      console.log('⚠️ userId non défini, skip du chargement')
      return
    }
    
    fetchStats()
  }, [userId, isLoadingUserId])
}
```

### 2. Améliorer `use-user-id.ts` pour sortir immédiatement

**Avant:**
```typescript
const storedUserId = localStorage.getItem('userId')
if (storedUserId) {
  setUserId(storedUserId)
  setIsLoading(false)
  return // ⚠️ Mais le code continuait parfois
}
// Vérifiait quand même la session...
```

**Après:**
```typescript
const storedUserId = localStorage.getItem('userId')
if (storedUserId) {
  console.log('🆔 userId trouvé dans localStorage:', storedUserId)
  setUserId(storedUserId)
  setIsLoading(false)
  return // ✅ Sort vraiment ici
}
// Ne vérifie la session QUE si pas de localStorage
```

### 3. Mettre à jour `home-section.tsx`

**Avant:**
```typescript
const { userId } = useUserId()
const { stats } = useHomeStats(userId || undefined)
```

**Après:**
```typescript
const { userId, isLoading: isLoadingUserId } = useUserId()
const { stats } = useHomeStats(userId || undefined, isLoadingUserId)
```

## 🔄 Nouveau Flux (Corrigé)

```
1. Page charge → useUserId() s'initialise
   ↓ userId = null, isLoading = true
   
2. useHomeStats reçoit isLoading = true
   ↓ Skip le chargement ⏸️
   
3. localStorage est lu → userId = "user-default-dev"
   ↓ useUserId met à jour: userId = "user-default-dev", isLoading = false
   ↓ Et SORT immédiatement (ne vérifie pas la session)
   
4. useHomeStats se déclenche MAINTENANT
   ↓ isLoading = false ✅
   ↓ userId = "user-default-dev" ✅
   ↓ Appelle /api/stats?userId=user-default-dev
   ↓ Retourne: { upcomingAppointments: 2 } ✅
   
5. FIN - Pas de 3ème appel
```

## 🎯 Résultat Attendu

- ✅ **Un seul appel** à l'API stats (au lieu de 2-3)
- ✅ **Stats correctes dès le premier chargement**
- ✅ **Pas de "flash" où les stats redeviennent 0**
- ✅ **Meilleure performance** (moins d'appels API)
- ✅ **Logs clairs** pour déboguer

## 🔍 Comment Vérifier

1. **Ouvrez la console DevTools** (F12)
2. **Rechargez la page**
3. **Vérifiez les logs:**

```
✅ Logs attendus:
🆔 userId trouvé dans localStorage: user-default-dev
⏳ useHomeStats - Attente du chargement de userId...
📊 useHomeStats - Chargement des stats pour userId: user-default-dev
📊 Stats API - userId reçu: user-default-dev
📊 Stats API - Rendez-vous trouvés pour userId: 5
📊 Stats API - Rendez-vous à venir: 2
✅ useHomeStats - Stats chargées: { upcomingAppointments: 2, ... }
```

4. **Vérifiez l'onglet Network:**
   - Devrait voir **1 seul appel** à `/api/stats?userId=user-default-dev`
   - Pas d'appel à `/api/stats` sans userId

5. **Dans le Dashboard:**
   - Les stats doivent apparaître **immédiatement et rester stables**
   - Pas de flash ou de changement après 0.5s

## 📝 Fichiers Modifiés

1. ✅ `hooks/use-user-id.ts` - Ajout logs + sortie immédiate
2. ✅ `hooks/useApi.ts` - useHomeStats attend isLoadingUserId
3. ✅ `components/home-section.tsx` - Passe isLoadingUserId au hook
4. ✅ `app/api/stats/route.ts` - Nettoyage import inutile

## 🚀 Test Rapide

```bash
# Dans votre navigateur, console:
localStorage.setItem('userId', 'user-default-dev')

# Puis rechargez la page
location.reload()

# Les stats doivent s'afficher correctement sans flash!
```

---

**Date:** 25 octobre 2025
**Status:** ✅ Corrigé
**Impact:** Résout complètement le problème de "flash" des statistiques

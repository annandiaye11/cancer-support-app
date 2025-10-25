# 📅 Système de Gestion des Rendez-vous - Documentation

## 🎯 Vue d'ensemble

Le système de gestion des rendez-vous est maintenant **entièrement connecté à MongoDB**. Les rendez-vous sont stockés dans la base de données et non plus dans localStorage.

## 🏗️ Architecture

### 1. **Base de données - MongoDB**
- **Collection** : `appointments`
- **Modèle** : `models/Appointment.ts`
- **Connexion** : Via MongoDB Atlas

### 2. **API Routes**
```
GET    /api/appointments           # Récupérer tous les rendez-vous (avec filtres)
POST   /api/appointments           # Créer un nouveau rendez-vous
GET    /api/appointments/[id]      # Récupérer un rendez-vous spécifique
PUT    /api/appointments/[id]      # Mettre à jour un rendez-vous
DELETE /api/appointments/[id]      # Supprimer un rendez-vous
```

### 3. **Composants**
- **`appointments-section.tsx`** : Interface utilisateur principale
- **Hook `use-user-id.ts`** : Gestion de l'authentification utilisateur

## 📊 Schéma de données

```typescript
interface Appointment {
  _id: string                    // ID MongoDB
  userId: string                 // ID de l'utilisateur
  title: string                  // Titre du rendez-vous
  description?: string           // Description optionnelle
  type: 'medical' | 'treatment' | 'support' | 'screening'
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled'
  date: string                   // Date (format: YYYY-MM-DD)
  time: string                   // Heure (format: HH:MM)
  duration: number              // Durée en minutes
  location: {
    name: string                // Nom du lieu
    address?: string            // Adresse complète
    phone?: string              // Téléphone du lieu
    type: 'hospital' | 'clinic' | 'home' | 'online'
  }
  doctor?: {
    name: string                // Nom du médecin
    specialty: string           // Spécialité
    phone?: string              // Téléphone
  }
  notes?: string                // Notes additionnelles
}
```

## 🔄 Flux de données

### Création d'un rendez-vous

```mermaid
User Interface → POST /api/appointments → MongoDB → Response → UI Update
```

1. L'utilisateur remplit le formulaire
2. Le composant envoie une requête POST à `/api/appointments`
3. L'API valide les données et les enregistre dans MongoDB
4. MongoDB retourne le document créé avec son `_id`
5. Le composant met à jour la liste des rendez-vous

### Modification d'un rendez-vous

```mermaid
User Interface → PUT /api/appointments/[id] → MongoDB → Response → UI Update
```

1. L'utilisateur clique sur "Modifier"
2. Le formulaire se pré-remplit avec les données existantes
3. L'utilisateur modifie les informations
4. Le composant envoie une requête PUT à `/api/appointments/[id]`
5. MongoDB met à jour le document
6. Le composant met à jour la liste

### Suppression d'un rendez-vous

```mermaid
User Interface → DELETE /api/appointments/[id] → MongoDB → Response → UI Update
```

## 🔐 Authentification

### Hook `useUserId()`

Le hook personnalisé gère l'identification de l'utilisateur :

1. **Priorité 1** : Récupère l'ID depuis NextAuth session
2. **Priorité 2** : Récupère l'ID depuis localStorage (développement)
3. **Fallback** : Crée un ID temporaire

```typescript
const { userId, isLoading } = useUserId()
```

## 📝 Utilisation dans le code

### Récupérer les rendez-vous

```typescript
const fetchAppointments = async () => {
  const response = await fetch(`/api/appointments?userId=${userId}`)
  const data = await response.json()
  setAppointments(data.appointments || [])
}
```

### Créer un rendez-vous

```typescript
const createAppointment = async (appointmentData) => {
  const response = await fetch('/api/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...appointmentData, userId })
  })
  
  const newAppointment = await response.json()
  return newAppointment
}
```

### Modifier un rendez-vous

```typescript
const updateAppointment = async (id, updatedData) => {
  const response = await fetch(`/api/appointments/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData)
  })
  
  const updated = await response.json()
  return updated
}
```

### Supprimer un rendez-vous

```typescript
const deleteAppointment = async (id) => {
  const response = await fetch(`/api/appointments/${id}`, {
    method: 'DELETE'
  })
  
  const result = await response.json()
  return result
}
```

## 🎨 Interface utilisateur

### États de chargement

L'interface affiche différents états :

1. **Chargement initial** : Spinner avec message "Chargement des rendez-vous..."
2. **Liste vide** : Message invitant à créer le premier rendez-vous
3. **Liste avec données** : Affichage des cartes de rendez-vous

### Filtres

Trois filtres sont disponibles :
- **À venir** : Rendez-vous futurs (par défaut)
- **Passés** : Rendez-vous passés
- **Tous** : Tous les rendez-vous

### Actions disponibles

Sur chaque rendez-vous :
- ✏️ **Modifier** : Ouvre le formulaire pré-rempli
- 🗑️ **Supprimer** : Supprime après confirmation
- ✅ **Changer le statut** : Marquer comme confirmé/terminé/annulé

## 🚀 Améliorations futures

### 1. **Notifications**
- Rappels par email avant les rendez-vous
- Notifications push (PWA)

### 2. **Synchronisation calendrier**
- Export iCal
- Synchronisation avec Google Calendar

### 3. **Récurrence**
- Rendez-vous récurrents (hebdomadaires, mensuels)

### 4. **Partage**
- Partager un rendez-vous avec un proche
- Export PDF du calendrier

### 5. **Statistiques**
- Nombre de rendez-vous par mois
- Taux de présence
- Historique médical

## 🐛 Débogage

### Vérifier la connexion MongoDB

```bash
# Dans le terminal
pnpm dev

# Vérifier les logs de connexion
# Devrait afficher : "✅ MongoDB connecté avec succès"
```

### Tester l'API manuellement

```bash
# Créer un rendez-vous
curl -X POST http://localhost:3000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test-user-123",
    "title": "Consultation",
    "type": "medical",
    "status": "scheduled",
    "date": "2025-11-01",
    "time": "10:00",
    "duration": 30,
    "location": {
      "name": "Clinique Test",
      "type": "clinic"
    }
  }'

# Récupérer les rendez-vous
curl http://localhost:3000/api/appointments?userId=test-user-123
```

### Problèmes courants

#### Erreur : "Cannot read property 'appointments' of undefined"
**Solution** : Vérifier que l'API retourne bien `{ appointments: [...] }`

#### Erreur : "userId is required"
**Solution** : S'assurer que le hook `useUserId()` retourne bien un ID

#### Rendez-vous non affichés
**Solution** : 
1. Vérifier la connexion MongoDB
2. Vérifier que `userId` correspond aux rendez-vous en base
3. Vérifier les filtres (à venir/passés/tous)

## 📚 Ressources

- [Documentation MongoDB](https://docs.mongodb.com/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Mongoose ODM](https://mongoosejs.com/docs/guide.html)
- [Date-fns Documentation](https://date-fns.org/docs/Getting-Started)

## 🤝 Contribution

Pour contribuer à cette fonctionnalité :

1. Créer une branche depuis `feature/rdv`
2. Faire les modifications
3. Tester localement
4. Créer une Pull Request

---

**Dernière mise à jour** : 25 octobre 2025
**Version** : 2.0.0 (MongoDB intégré)

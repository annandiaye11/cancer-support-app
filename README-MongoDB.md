# 🏥 CareCompanion - Application de Support Cancer avec MongoDB Atlas

## 📋 Configuration de la Base de Données MongoDB Atlas

### 1. 🚀 Créer un compte MongoDB Atlas

1. Allez sur [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Créez un compte gratuit
3. Créez un nouveau cluster (gratuit)

### 2. 🔧 Configuration du Cluster

1. **Nom du cluster** : `cancer-support-cluster`
2. **Provider** : AWS (recommandé)
3. **Région** : Choisissez la plus proche de vos utilisateurs
4. **Tier** : M0 (gratuit)

### 3. 🔐 Configuration de la Sécurité

#### Créer un utilisateur de base de données :
1. Dans "Database Access", cliquez sur "Add New Database User"
2. **Username** : `cancer-app-user`
3. **Password** : Générez un mot de passe sécurisé
4. **Database User Privileges** : "Read and write to any database"

#### Configurer les adresses IP autorisées :
1. Dans "Network Access", cliquez sur "Add IP Address"
2. Pour le développement : "Allow Access from Anywhere" (0.0.0.0/0)
3. Pour la production : Ajoutez les IPs spécifiques de vos serveurs

### 4. 🔗 Obtenir la chaîne de connexion

1. Dans "Clusters", cliquez sur "Connect"
2. Choisissez "Connect your application"
3. Copiez la chaîne de connexion
4. Format : `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<database>?retryWrites=true&w=majority`

### 5. ⚙️ Configuration de l'application

1. **Créez le fichier `.env.local`** (déjà créé) :
```env
MONGODB_URI=mongodb+srv://cancer-app-user:VOTRE_MOT_DE_PASSE@cluster0.xxxxx.mongodb.net/cancer-support-app?retryWrites=true&w=majority
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=votre-clé-secrète-très-longue-et-sécurisée
JWT_SECRET=votre-jwt-secret-également-très-sécurisé
```

2. **Remplacez** :
   - `VOTRE_MOT_DE_PASSE` par le mot de passe de l'utilisateur
   - `cluster0.xxxxx` par votre cluster réel
   - Générez des secrets sécurisés pour NEXTAUTH_SECRET et JWT_SECRET

## 🏗️ Structure de la Base de Données

### 📊 Collections créées :

#### 👥 **users**
- Profils utilisateurs
- Authentification
- Préférences
- Historique médical

#### 📖 **articles**
- Articles de santé
- Catégories : Prévention, Dépistage, Nutrition, etc.
- SEO et métadonnées
- Système de likes et vues

#### 🎥 **videos**
- Vidéos thérapeutiques
- Exercices, relaxation, yoga
- Durée et catégorisation
- Statistiques de visionnage

#### 📅 **appointments**
- Rendez-vous médicaux
- Types : médical, traitement, support
- Localisation et contacts
- Système de rappels

#### 🔍 **screenings**
- Dépistages effectués
- Planification des prochains
- Résultats et notes
- Fréquences personnalisées

#### ⏰ **reminders**
- Rappels personnalisés
- Médicaments, exercices
- Fréquences multiples
- Métadonnées associées

## 🚀 Commandes Disponibles

```bash
# Développement
pnpm dev

# Peupler la base de données avec des données d'exemple
pnpm db:seed

# Build pour production
pnpm build

# Démarrer en production
pnpm start
```

## 📡 API Endpoints

### 🔐 Authentification
- `POST /api/auth/signin` - Connexion
- `POST /api/auth/signout` - Déconnexion

### 👥 Utilisateurs
- `GET /api/users` - Liste des utilisateurs
- `POST /api/users` - Créer un utilisateur
- `GET /api/users/[id]` - Détails d'un utilisateur
- `PUT /api/users/[id]` - Modifier un utilisateur
- `DELETE /api/users/[id]` - Supprimer un utilisateur

### 📖 Articles
- `GET /api/articles` - Liste des articles
- `POST /api/articles` - Créer un article
- `GET /api/articles/[id]` - Détails d'un article
- `PUT /api/articles/[id]` - Modifier un article

### 📅 Rendez-vous
- `GET /api/appointments` - Liste des RDV
- `POST /api/appointments` - Créer un RDV
- `GET /api/appointments/[id]` - Détails d'un RDV
- `PUT /api/appointments/[id]` - Modifier un RDV

## 🎯 Hooks API Disponibles

```typescript
// Articles
const { data, loading, error } = useArticles({
  category: 'Prévention',
  featured: true,
  page: 1
})

// Vidéos
const { data } = useVideos({ category: 'Relaxation' })

// Rendez-vous
const { data } = useAppointments(userId, {
  status: 'scheduled',
  fromDate: '2025-01-01'
})

// Mutations
const { mutate, loading } = useApiMutation()
await mutate('/users', 'POST', userData)
```

## 🔒 Sécurité et Bonnes Pratiques

### ✅ Implémenté :
- ✅ Hachage des mots de passe (bcrypt)
- ✅ Authentification JWT (NextAuth)
- ✅ Validation des données (Mongoose)
- ✅ Index de base de données optimisés
- ✅ Gestion des erreurs centralisée
- ✅ Variables d'environnement sécurisées

### 🎯 Recommandations Production :
- [ ] HTTPS obligatoire
- [ ] Rate limiting sur les APIs
- [ ] Backup automatisés
- [ ] Monitoring et logs
- [ ] Tests automatisés
- [ ] CI/CD pipeline

## 🛠️ Développement

### Première installation :
```bash
# Cloner et installer
git clone [repo]
cd cancer-support-app
pnpm install

# Configurer .env.local avec vos credentials MongoDB

# Peupler la base avec des données d'exemple
pnpm db:seed

# Lancer le serveur de développement
pnpm dev
```

### 🎨 Styles et UI :
- **Framework** : Next.js 16 + React 19
- **Styling** : Tailwind CSS
- **Components** : Radix UI + shadcn/ui
- **Icons** : Lucide React

## 📞 Support

Pour toute question concernant la configuration de MongoDB Atlas ou l'utilisation de l'API, consultez :
- [Documentation MongoDB Atlas](https://docs.atlas.mongodb.com/)
- [Guide Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Documentation NextAuth.js](https://next-auth.js.org/)

---

🎉 **Votre base de données MongoDB Atlas est maintenant prête à alimenter CareCompanion !**

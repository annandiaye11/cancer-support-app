# 💜 Kaëra - Ensemble face au cancer

<div align="center">
  
  ![Logo Kaëra](public/kaera-logo.png)
  
  ![Octobre Rose](https://img.shields.io/badge/Octobre%20Rose-2025-FF69B4?style=for-the-badge)
  ![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
  ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)
  
  **Votre compagnon de santé personnalisé contre le cancer**
  
  *Accompagnement • Prévention • Soutien psychologique 24/7*
  
  [🎯 Démo](#démo) • [✨ Fonctionnalités](#fonctionnalités) • [🚀 Installation](#installation) • [📖 Documentation](#documentation)

</div>

---

## 📋 Table des Matières

- [À propos du projet](#à-propos-du-projet)
- [Contexte - Hackathon Octobre Rose](#contexte---hackathon-octobre-rose)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Architecture](#architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Structure du projet](#structure-du-projet)
- [API Routes](#api-routes)
- [Contribution](#contribution)
- [Équipe](#équipe)
- [Licence](#licence)

---

## 🎯 À propos du projet

**CareCompanion** est une application web innovante développée dans le cadre d'un hackathon dédié au mois d'Octobre Rose. Notre mission est de fournir une plateforme complète qui accompagne les utilisateurs dans leur parcours de prévention et de lutte contre le cancer.

### 🎗️ Vision

Démocratiser l'accès à l'information sur le cancer, faciliter le suivi médical et créer une communauté de soutien pour tous ceux touchés par cette maladie.

### 🌟 Objectifs

- **Éduquer** : Fournir des ressources fiables et accessibles sur la prévention du cancer
- **Accompagner** : Offrir des outils de suivi personnalisés pour les dépistages et rendez-vous
- **Sensibiliser** : Promouvoir les bonnes pratiques de prévention et de détection précoce
- **Soutenir** : Créer un espace sécurisé d'information et d'accompagnement

---

## 🎗️ Contexte - Hackathon Octobre Rose

Ce projet a été développé dans le cadre d'un hackathon national consacré au **mois d'Octobre Rose 2025**, campagne annuelle de sensibilisation au dépistage précoce du cancer du sein et des autres types de cancer.

### 📊 Chiffres clés qui nous motivent

- **1 femme sur 8** développera un cancer du sein au cours de sa vie
- **99%** de taux de survie à 5 ans en cas de dépistage précoce
- **50%** des cancers pourraient être évités par la prévention

### 🎯 Notre contribution

CareCompanion répond directement aux défis du dépistage et de la prévention en proposant :
- Un accompagnement personnalisé selon le profil de chaque utilisateur
- Des rappels automatiques pour les dépistages essentiels
- Une information médicale validée et accessible
- Un parcours adapté aux modes préventif et curatif

---

## ✨ Fonctionnalités

### 🚀 Fonctionnalités principales

#### 1. 📝 Onboarding personnalisé
- Questionnaire initial pour déterminer le profil de l'utilisateur
- Choix du mode : **Préventif** (sensibilisation) ou **Curatif** (accompagnement)
- Personnalisation de l'interface selon le genre et l'âge
- Thème adapté automatiquement

#### 2. 🏠 Tableau de bord intelligent
- Vue d'ensemble personnalisée selon le profil
- Statistiques de santé et suivi des objectifs
- Accès rapide aux fonctionnalités clés
- Notifications et rappels importants

#### 3. 📚 Bibliothèque d'articles
- Articles médicaux validés par des professionnels
- Catégories : Prévention, Dépistage, Traitements, Témoignages
- Système de recherche et de filtrage
- Contenu adapté au profil de l'utilisateur

#### 4. 🎥 Vidéothèque éducative
- Vidéos explicatives sur les différents types de cancer
- Tutoriels sur l'auto-examen (sein, peau)
- Témoignages de patients et de professionnels
- Exercices et conseils bien-être

#### 5. 📅 Gestionnaire de calendrier médical
- Prise de rendez-vous médicaux
- Rappels automatiques pour les dépistages
- Suivi des mammographies, frottis et autres examens
- Historique complet des consultations

#### 6. 👤 Profil utilisateur complet
- Gestion des informations personnelles
- Historique médical sécurisé
- Préférences de notifications
- Suivi des objectifs de santé

### 🔐 Sécurité et Confidentialité

- **Authentification sécurisée** avec NextAuth.js
- **Cryptage des données** sensibles avec bcrypt
- **Conformité RGPD** pour la protection des données
- **Stockage sécurisé** sur MongoDB Atlas
- **Sessions sécurisées** avec JWT

### ♿ Accessibilité

- Interface responsive (mobile, tablette, desktop)
- Design accessible (WCAG 2.1)
- Thèmes adaptés (clair/sombre)
- Navigation intuitive

---

## 🛠️ Technologies utilisées

### Frontend

- **[Next.js 15](https://nextjs.org/)** - Framework React avec App Router
- **[React 19](https://react.dev/)** - Bibliothèque UI avec Server Components
- **[TypeScript](https://www.typescriptlang.org/)** - Typage statique
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Radix UI](https://www.radix-ui.com/)** - Composants accessibles
- **[Lucide Icons](https://lucide.dev/)** - Icônes modernes
- **[Shadcn/ui](https://ui.shadcn.com/)** - Composants UI réutilisables

### Backend

- **[Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)** - API REST
- **[MongoDB Atlas](https://www.mongodb.com/atlas)** - Base de données cloud
- **[Mongoose](https://mongoosejs.com/)** - ODM pour MongoDB
- **[NextAuth.js](https://next-auth.js.org/)** - Authentification
- **[bcryptjs](https://www.npmjs.com/package/bcryptjs)** - Hachage de mots de passe
- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)** - Gestion des tokens JWT

### Outils de développement

- **[pnpm](https://pnpm.io/)** - Gestionnaire de paquets rapide
- **[ESLint](https://eslint.org/)** - Linter JavaScript/TypeScript
- **[Prettier](https://prettier.io/)** - Formateur de code
- **[tsx](https://www.npmjs.com/package/tsx)** - Exécution TypeScript

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Client (Browser)                   │
│                 Next.js App Router                   │
└────────────────────┬────────────────────────────────┘
                     │
                     │ HTTPS
                     │
┌────────────────────▼────────────────────────────────┐
│              Next.js API Routes                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │   Auth   │  │  Users   │  │ Articles │          │
│  └──────────┘  └──────────┘  └──────────┘          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │  Videos  │  │Appoint.  │  │ Screens  │          │
│  └──────────┘  └──────────┘  └──────────┘          │
└────────────────────┬────────────────────────────────┘
                     │
                     │ Mongoose
                     │
┌────────────────────▼────────────────────────────────┐
│              MongoDB Atlas (Cloud)                   │
│  ┌──────────────────────────────────────────────┐  │
│  │         Collections (NoSQL)                   │  │
│  │  • users      • articles    • videos         │  │
│  │  • appointments • screenings • reminders     │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### 📦 Modèles de données

- **User** : Profil utilisateur, authentification, préférences
- **Article** : Contenu éducatif, catégories, auteur
- **Video** : Ressources vidéo, durée, thématique
- **Appointment** : Rendez-vous médicaux, rappels
- **Screening** : Historique des dépistages
- **Reminder** : Notifications et rappels personnalisés

---

## 🚀 Installation

### Prérequis

Assurez-vous d'avoir installé :

- **Node.js** 18.17 ou supérieur
- **pnpm** 8.0 ou supérieur (ou npm/yarn)
- **Git**
- Un compte **MongoDB Atlas** (gratuit)

### Étapes d'installation

1. **Cloner le repository**

```bash
git clone https://github.com/annandiaye11/cancer-support-app.git
cd cancer-support-app
```

2. **Installer les dépendances**

```bash
pnpm install
# ou
npm install
# ou
yarn install
```

3. **Configurer les variables d'environnement**

Créez un fichier `.env.local` à la racine du projet :

```env
# MongoDB Atlas
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=votre-secret-ultra-securise-ici

# Application
NODE_ENV=development
```

> 📝 **Note** : Consultez le fichier [README-MongoDB.md](./README-MongoDB.md) pour la configuration détaillée de MongoDB Atlas.

4. **Initialiser la base de données** (optionnel)

```bash
pnpm db:seed
```

Cette commande va créer des données d'exemple (articles, vidéos, utilisateurs de test).

5. **Lancer le serveur de développement**

```bash
pnpm dev
```

6. **Ouvrir l'application**

Accédez à [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## ⚙️ Configuration

### Configuration MongoDB Atlas

Suivez le guide détaillé dans [README-MongoDB.md](./README-MongoDB.md) pour :
- Créer un cluster MongoDB Atlas
- Configurer la sécurité et les accès
- Obtenir votre URI de connexion
- Structurer vos collections

### Configuration de l'authentification

1. **Générer un secret NextAuth**

```bash
openssl rand -base64 32
```

2. **Configurer les providers d'authentification**

Modifiez `app/api/auth/[...nextauth]/route.ts` selon vos besoins.

### Variables d'environnement

| Variable | Description | Requis |
|----------|-------------|---------|
| `MONGODB_URI` | URI de connexion MongoDB Atlas | ✅ Oui |
| `NEXTAUTH_URL` | URL de l'application | ✅ Oui |
| `NEXTAUTH_SECRET` | Secret pour les sessions | ✅ Oui |
| `NODE_ENV` | Environnement (development/production) | ❌ Non |

---

## 💻 Utilisation

### Démarrage rapide

1. **Première visite** : Complétez l'onboarding pour personnaliser votre expérience
2. **Explorer** : Parcourez les articles et vidéos éducatives
3. **Planifier** : Ajoutez vos rendez-vous médicaux au calendrier
4. **Suivre** : Consultez votre tableau de bord pour rester informé

### Commandes disponibles

```bash
# Développement
pnpm dev          # Lance le serveur de développement

# Production
pnpm build        # Compile l'application pour la production
pnpm start        # Lance le serveur en production

# Qualité du code
pnpm lint         # Vérifie le code avec ESLint

# Base de données
pnpm db:seed      # Peuple la base avec des données d'exemple
```

### Mode développement

Le serveur de développement inclut :
- ⚡ Hot Module Replacement (HMR)
- 🔍 React DevTools
- 📊 Next.js Fast Refresh
- 🐛 Source maps pour le débogage

---

## 📁 Structure du projet

```
cancer-support-app/
├── app/                          # App Router Next.js
│   ├── api/                      # API Routes
│   │   ├── appointments/         # Gestion des rendez-vous
│   │   ├── articles/             # Gestion des articles
│   │   ├── auth/                 # Authentification NextAuth
│   │   └── users/                # Gestion des utilisateurs
│   ├── globals.css               # Styles globaux
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Page d'accueil
│
├── components/                   # Composants React
│   ├── ui/                       # Composants UI réutilisables
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── calendar.tsx
│   │   └── ...
│   ├── articles-section.tsx      # Section articles
│   ├── calendar-section.tsx      # Section calendrier
│   ├── dashboard.tsx             # Tableau de bord principal
│   ├── home-section.tsx          # Section accueil
│   ├── onboarding-flow.tsx       # Flux d'onboarding
│   ├── profile-section.tsx       # Section profil
│   └── videos-section.tsx        # Section vidéos
│
├── models/                       # Modèles Mongoose
│   ├── User.ts                   # Modèle utilisateur
│   ├── Article.ts                # Modèle article
│   ├── Video.ts                  # Modèle vidéo
│   ├── Appointment.ts            # Modèle rendez-vous
│   ├── Screening.ts              # Modèle dépistage
│   └── Reminder.ts               # Modèle rappel
│
├── lib/                          # Utilitaires et helpers
│   ├── mongodb.ts                # Configuration MongoDB
│   ├── api-utils.ts              # Utilitaires API
│   └── utils.ts                  # Fonctions utilitaires
│
├── hooks/                        # Custom React Hooks
│   ├── use-mobile.ts             # Hook détection mobile
│   └── use-toast.ts              # Hook notifications
│
├── types/                        # Types TypeScript
│   └── next-auth.d.ts            # Types NextAuth
│
├── public/                       # Assets statiques
│   ├── *.jpg                     # Images
│   ├── *.png                     # Images
│   └── *.svg                     # Icônes
│
├── scripts/                      # Scripts utilitaires
│   └── seed.ts                   # Script de peuplement DB
│
├── .env.local                    # Variables d'environnement (non versionné)
├── components.json               # Configuration Shadcn/ui
├── next.config.mjs               # Configuration Next.js
├── package.json                  # Dépendances et scripts
├── pnpm-lock.yaml               # Lock file pnpm
├── postcss.config.mjs           # Configuration PostCSS
├── tsconfig.json                # Configuration TypeScript
├── README.md                    # Ce fichier
└── README-MongoDB.md            # Guide MongoDB Atlas
```

---

## 🌐 API Routes

### Authentification

```
POST   /api/auth/signin          # Connexion
POST   /api/auth/signout         # Déconnexion
POST   /api/auth/signup          # Inscription
GET    /api/auth/session         # Session actuelle
```

### Utilisateurs

```
GET    /api/users                # Liste des utilisateurs
GET    /api/users/[id]           # Détails utilisateur
PUT    /api/users/[id]           # Mise à jour profil
DELETE /api/users/[id]           # Suppression utilisateur
```

### Articles

```
GET    /api/articles             # Liste des articles
GET    /api/articles/[id]        # Détails article
POST   /api/articles             # Créer article
PUT    /api/articles/[id]        # Modifier article
DELETE /api/articles/[id]        # Supprimer article
```

### Rendez-vous

```
GET    /api/appointments         # Liste des rendez-vous
POST   /api/appointments         # Créer rendez-vous
PUT    /api/appointments/[id]    # Modifier rendez-vous
DELETE /api/appointments/[id]    # Supprimer rendez-vous
```

> 📚 Documentation complète de l'API disponible dans `/docs/api.md` (à venir)

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Ce projet est open source et nous encourageons la communauté à participer.

### Comment contribuer

1. **Fork** le projet
2. **Créez** votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. **Commitez** vos changements (`git commit -m 'Add some AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrez** une Pull Request

### Standards de code

- Utilisez TypeScript pour tout nouveau code
- Suivez les conventions ESLint configurées
- Écrivez des commits descriptifs
- Documentez les nouvelles fonctionnalités
- Testez vos changements avant de soumettre

### Signaler un bug

Ouvrez une issue en décrivant :
- Le comportement attendu
- Le comportement actuel
- Les étapes pour reproduire
- Captures d'écran si applicable
- Votre environnement (OS, navigateur, version Node.js)

---

## 👥 Équipe

Ce projet a été développé avec passion par notre équipe lors du hackathon Octobre Rose 2025.

### Développeurs

- **[Votre Nom]** - Lead Developer - [@github](https://github.com/annandiaye11)
- **[Membre 2]** - Frontend Developer
- **[Membre 3]** - Backend Developer
- **[Membre 4]** - UI/UX Designer

### Remerciements

- 🙏 Les organisateurs du hackathon Octobre Rose
- 💗 Les associations de lutte contre le cancer
- 🏥 Les professionnels de santé qui nous ont conseillés
- 👨‍👩‍👧‍👦 Tous les participants et testeurs

---

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 📞 Contact et Support

### 🌐 Liens utiles

- **Repository** : [github.com/annandiaye11/cancer-support-app](https://github.com/annandiaye11/cancer-support-app)
- **Issues** : [github.com/annandiaye11/cancer-support-app/issues](https://github.com/annandiaye11/cancer-support-app/issues)
- **Documentation** : [À venir]

### 💌 Nous contacter

- **Email** : contact@carecompanion.app
- **Twitter** : [@CareCompanion](https://twitter.com/carecompanion)
- **LinkedIn** : [CareCompanion](https://linkedin.com/company/carecompanion)

---

## 🎗️ Engagement Octobre Rose

Ce projet s'inscrit dans une démarche de sensibilisation et de prévention. Nous nous engageons à :

- ✅ Fournir des informations médicales validées
- ✅ Respecter la confidentialité des données
- ✅ Promouvoir le dépistage précoce
- ✅ Soutenir la recherche contre le cancer
- ✅ Être accessible à tous

### 🌸 Ressources externes

- [Octobre Rose - Association](https://www.cancerdusein.org/)
- [Institut National du Cancer](https://www.e-cancer.fr/)
- [Ligue contre le cancer](https://www.ligue-cancer.net/)
- [Fondation ARC](https://www.fondation-arc.org/)

---

<div align="center">
  
  **Fait avec 💗 pour Octobre Rose 2025**
  
  _Ensemble, agissons contre le cancer_
  
  ![Pink Ribbon](https://img.shields.io/badge/🎗️-Octobre%20Rose-FF69B4?style=for-the-badge)
  
</div>

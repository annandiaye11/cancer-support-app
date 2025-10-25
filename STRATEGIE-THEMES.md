# 🎨 Stratégie de Thématisation - CareCompanion

## 🎯 Concept : Thème Progressif

### Phase 1 : Onboarding (Unisexe)
**Couleurs** : Violet (#8b5cf6) + Teal (#14b8a6)  
**Pourquoi** : 
- Accueillant et neutre pour tous
- Moderne et attractif
- Évite les préjugés avant sélection
- Crée une première impression inclusive

### Phase 2 : Dashboard (Personnalisé)
**Après sélection du genre** :
- 👩 **Femme** → Thème rose/rose vif (oklch hue ~350°)
- 👨 **Homme** → Thème bleu marine (oklch hue ~250°)

**Pourquoi** :
- Personnalisation de l'expérience
- Reconnaissance visuelle immédiate du profil
- Confort psychologique (couleurs familières)
- Différenciation claire des parcours

## 🔄 Transition des Thèmes

```
Démarrage → Onboarding → Sélection Genre → Dashboard
  (unisex)   (violet/teal)   (choix)      (rose/bleu)
```

### Code Flow
1. **Initial** : `:root` theme (violet/teal)
2. **Sélection** : User clique "Une femme" ou "Un homme"
3. **Validation** : Utilisateur termine onboarding
4. **Application** : `useEffect` applique `.theme-female` ou `.theme-male` sur `<body>`
5. **Résultat** : Tout le dashboard change de couleur automatiquement

## 🎨 Palettes Détaillées

### Thème Unisexe (Défaut)
```css
Primaire : oklch(0.55 0.25 275) /* Violet vibrant */
Accent   : oklch(0.65 0.22 185) /* Teal moderne */
Usage    : Onboarding uniquement
```

### Thème Féminin
```css
Primaire : oklch(0.55 0.24 350) /* Rose/Pink vibrant */
Accent   : oklch(0.7 0.18 10)   /* Rose corail */
Usage    : Dashboard après sélection "femme"
Feeling  : Chaleureux, énergisant, soin
```

### Thème Masculin
```css
Primaire : oklch(0.35 0.15 250) /* Bleu marine profond */
Accent   : oklch(0.55 0.2 230)  /* Bleu ciel */
Usage    : Dashboard après sélection "homme"
Feeling  : Confiant, stable, fiable
```

## 💡 Avantages de cette Approche

### 1. Inclusivité initiale
- Personne ne se sent exclu dès l'arrivée
- Pas de présupposition du genre
- Accueil neutre et bienveillant

### 2. Personnalisation post-choix
- Expérience adaptée au profil
- Sentiment d'appartenance
- Interface "pour moi"

### 3. UX fluide
- Transition automatique et immédiate
- Pas de rechargement de page
- Effet "wow" lors du changement

### 4. Flexibilité technique
- Facile d'ajouter d'autres thèmes (ex: "Autre" genre)
- CSS variables permettent changement global
- Pas de duplication de composants

## 🚀 Évolutions Futures Possibles

### Option 1 : Thème "Autre/Neutre"
Pour personnes non-binaires :
```css
.theme-neutral {
  --primary: oklch(0.5 0.2 150); /* Vert/teal neutre */
  --accent: oklch(0.65 0.18 180); /* Cyan doux */
}
```

### Option 2 : Choix manuel de couleur
- Picker de couleur dans profil
- Préférences utilisateur sauvegardées
- Thèmes personnalisables (rose, bleu, vert, orange, etc.)

### Option 3 : Thème basé sur mode
Alternative : couleur selon préventif/curatif plutôt que genre
```css
.theme-preventive { /* Vert/émeraude */ }
.theme-curative   { /* Violet/orchidée */ }
```

## 📊 A/B Testing Recommandé

Mesurer l'impact de cette approche :

### Métriques
1. **Taux de complétion onboarding**
   - Avec vs sans thème unisexe initial
2. **Satisfaction utilisateur**
   - Sondage post-onboarding sur l'expérience
3. **Temps passé dans l'app**
   - Thème personnalisé augmente-t-il l'engagement ?
4. **Retour utilisateur**
   - Commentaires qualitatifs sur les couleurs

### Questions à tester
- Le thème unisexe rend-il l'onboarding plus confortable ?
- La transition de couleur est-elle bien perçue ?
- Faut-il animer la transition de thème ?
- Certains préfèrent-ils garder le thème unisexe ?

## 🎭 Considérations Psychologiques

### Couleurs et Émotions

**Rose/Pink (Féminin)**
- ✅ Compassion, douceur, soin
- ✅ Optimisme, espoir
- ⚠️ Éviter rose trop "Barbie" (pas infantilisant)

**Bleu/Navy (Masculin)**
- ✅ Confiance, sérénité, stabilité
- ✅ Professionnel, fiable
- ⚠️ Éviter trop foncé (peut sembler froid)

**Violet/Teal (Unisexe)**
- ✅ Équilibre, sagesse, modernité
- ✅ Guérison, bien-être
- ✅ Pas de connotation genrée forte

## 🔧 Implémentation Technique

### Fichiers concernés
- `app/page.tsx` - useEffect applique thème
- `app/globals.css` - Définition des 3 thèmes
- `components/dashboard.tsx` - Utilise couleurs du thème actif

### Comment ça marche
```tsx
// 1. Utilisateur termine onboarding
handleOnboardingComplete({ gender: "female", ... })

// 2. State est mis à jour
setUserProfile({ gender: "female", ... })

// 3. useEffect détecte le changement
useEffect(() => {
  if (userProfile) {
    // 4. Applique class sur body
    document.body.className = "theme-female"
  }
}, [userProfile])

// 5. Tout le CSS utilise les nouvelles variables
// --primary passe de violet à rose automatiquement
```

## 📝 Résumé Exécutif

**Vision** : Thème unisexe inclusif au début, puis personnalisation par genre  
**Bénéfice utilisateur** : Accueil neutre + expérience personnalisée  
**Bénéfice technique** : Simple, maintenable, extensible  
**Statut** : ✅ Implémenté et fonctionnel  

**Prochaine étape suggérée** : Tester avec vrais utilisateurs et recueillir feedback sur cette approche.

# 🔧 Fix : Fichiers Turbopack 404 (Page blanche)

## ❌ Problème

Lors du rechargement (`Ctrl+R`), tous les fichiers JavaScript échouent avec **404 Not Found** :

```
GET http://localhost:3000/_next/static/chunks/[turbopack]_browser_dev_hmr-client_...
[HTTP/1.1 404 Not Found]
```

**Cause racine** : 
- Le **HTML en cache** du navigateur contient des références à des fichiers **Turbopack**
- Le serveur tourne en mode **webpack** → ces fichiers n'existent pas
- Résultat : Page blanche

---

## ✅ Solutions appliquées

### 1. Configuration `package.json` corrigée ✅

**Avant** :
```json
"scripts": {
  "dev": "next dev"
}
```

**Après** :
```json
"scripts": {
  "dev": "next dev --webpack"
}
```

**Pourquoi ?** Force toujours l'utilisation de webpack, évite les incohérences.

### 2. Script de nettoyage créé ✅

**Fichier** : `scripts/clean-cache.sh`

**Usage** :
```bash
./scripts/clean-cache.sh
```

**Ce qu'il fait** :
- Arrête tous les serveurs Next.js
- Supprime `.next/`, `out/`, `.turbopack/`
- Nettoie `node_modules/.cache`

### 3. Cache serveur nettoyé ✅

```bash
rm -rf .next
pnpm dev --webpack
```

---

## 🌐 Actions OBLIGATOIRES dans le navigateur

### ⚠️ IMPORTANT : Le cache navigateur contient encore l'ancien HTML

Même si le serveur est corrigé, votre navigateur a mis en cache la **page HTML** qui référence les anciens fichiers Turbopack.

### Solution complète (suivez dans l'ordre)

#### Étape 1 : Vider le cache complet

**Chrome / Edge / Brave** :
1. `Ctrl+Shift+Delete`
2. Cochez :
   - ✅ **Images et fichiers en cache**
   - ✅ **Cookies et autres données de site**
3. Période : **Dernières 24 heures**
4. Cliquez **"Effacer les données"**

**Firefox** :
1. `Ctrl+Shift+Delete`
2. Cochez :
   - ✅ **Cache**
   - ✅ **Cookies**
3. Période : **Tout**
4. Cliquez **"Effacer maintenant"**

#### Étape 2 : Vider le stockage de localhost

1. Ouvrir DevTools : `F12`
2. Onglet **Application** (Chrome) ou **Stockage** (Firefox)
3. Menu gauche : clic droit sur `http://localhost:3000`
4. **"Clear"** ou **"Supprimer"**

#### Étape 3 : Fermer complètement le navigateur

1. Fermez **TOUS** les onglets localhost:3000
2. Fermez **complètement** le navigateur (pas juste la fenêtre)
3. Rouvrez le navigateur

#### Étape 4 : Test en navigation privée

Pour vérifier que ça fonctionne sans cache :
- `Ctrl+Shift+N` (Chrome/Edge/Brave)
- `Ctrl+Shift+P` (Firefox)
- Allez sur http://localhost:3000

Si ça fonctionne en navigation privée mais pas en mode normal → le cache n'a pas été complètement vidé.

---

## 🛠️ Configuration pour le développement

### Désactiver le cache pendant le dev

1. Ouvrir DevTools : `F12`
2. Onglet **Network**
3. ✅ Cocher **"Disable cache"**
4. **Garder les DevTools ouverts** pendant tout le développement

### Alternative : Utiliser le hard reload automatiquement

Dans Chrome, vous pouvez forcer le hard reload :
1. DevTools ouverts (`F12`)
2. **Clic droit** sur le bouton Actualiser 🔄
3. **"Vider le cache et effectuer une actualisation forcée"**

---

## 🔍 Vérification que ça fonctionne

### Test 1 : Vérifier les fichiers chargés

1. Ouvrir DevTools : `F12`
2. Onglet **Network**
3. Recharger la page (`Ctrl+R`)
4. Vérifier les fichiers chargés :

**✅ BON** (webpack) :
```
/_next/static/chunks/webpack-abc123.js
/_next/static/chunks/pages/_app-def456.js
```

**❌ MAUVAIS** (turbopack) :
```
/_next/static/chunks/[turbopack]_browser_dev_hmr-client_...
/_next/static/chunks/turbopack-_3d754327._.js
```

### Test 2 : Vérifier la console

Dans la console DevTools, vous devez voir :
```
✓ Ready in 2s
```

**Pas d'erreurs** comme :
```
Failed to load resource: the server responded with a status of 404 (Not Found)
```

### Test 3 : Vérifier le terminal

Le terminal du serveur doit afficher :
```
▲ Next.js 16.0.0 (webpack)
✓ Ready in 1916ms
```

**Pas** :
```
▲ Next.js 16.0.0 (Turbopack)
```

---

## 📋 Checklist de dépannage

Si le problème persiste :

- [ ] Le serveur tourne-t-il bien en mode webpack ? (vérifier le terminal)
- [ ] Ai-je vidé complètement le cache du navigateur ?
- [ ] Ai-je fermé tous les onglets localhost ?
- [ ] Ai-je fermé complètement le navigateur et rouvert ?
- [ ] Ai-je testé en navigation privée ?
- [ ] Les DevTools sont-ils ouverts avec "Disable cache" activé ?
- [ ] Le cache de `.next/` a-t-il été supprimé ?
- [ ] Y a-t-il d'autres processus Next.js qui tournent ? (`pkill -f "next dev"`)

---

## 🚀 Commandes utiles

### Nettoyage complet

```bash
# Méthode 1 : Script automatique
./scripts/clean-cache.sh

# Méthode 2 : Commandes manuelles
pkill -f "next dev"
rm -rf .next out .turbopack node_modules/.cache
pnpm dev
```

### Vérifier les processus Next.js

```bash
# Lister les processus
ps aux | grep "next dev"

# Tuer tous les processus Next.js
pkill -f "next dev"
```

### Redémarrage propre

```bash
# One-liner pour tout nettoyer et redémarrer
pkill -f "next dev" && sleep 2 && rm -rf .next && pnpm dev
```

---

## 💡 Comprendre le problème

### Pourquoi ça arrive ?

1. **Premier lancement** : Serveur démarré en mode Turbopack (par défaut Next.js 16)
2. **HTML mis en cache** : Le navigateur stocke la page HTML avec les références Turbopack
3. **Changement de mode** : Serveur redémarré en mode webpack
4. **Incohérence** : HTML ancien (Turbopack) + Serveur nouveau (webpack) = 404

### Schéma du problème

```
┌─────────────────────┐
│  Cache navigateur   │
│  HTML avec refs     │  ──────┐
│  Turbopack          │        │
└─────────────────────┘        │ Références
                                │ vers fichiers
                                │ qui n'existent pas
                                ▼
┌─────────────────────┐     ❌ 404
│  Serveur Next.js    │
│  Mode: webpack      │
│  Fichiers webpack   │
└─────────────────────┘
```

### La solution

```
┌─────────────────────┐
│  Cache vidé         │
│  Pas d'HTML stocké  │  ──────┐
│                     │        │
└─────────────────────┘        │ Récupère
                                │ nouveau HTML
                                ▼
┌─────────────────────┐     ✅ HTML avec
│  Serveur Next.js    │        refs webpack
│  Mode: webpack      │
│  Fichiers webpack   │  ──────┐
└─────────────────────┘        │
                                │ Charge
                                │ fichiers
                                ▼
                             ✅ OK
```

---

## 🎯 Prévention

### 1. Toujours utiliser le même mode

Dans `package.json` :
```json
"dev": "next dev --webpack"
```

### 2. Désactiver le cache en dev

DevTools > Network > ✅ Disable cache

### 3. Script de nettoyage

Créer un alias dans votre `~/.bashrc` :
```bash
alias next-clean='pkill -f "next dev" && rm -rf .next && pnpm dev'
```

### 4. Extension navigateur

Installer une extension pour vider le cache facilement :
- **Chrome** : "Clear Cache"
- **Firefox** : "Cache Cleaner"

---

**Date du fix** : 25 octobre 2025  
**Status** : ✅ SERVEUR CORRIGÉ  
**Action requise** : Vider le cache du navigateur  
**Commande** : `pnpm dev` (maintenant avec `--webpack` par défaut)

#!/bin/bash

# 🧹 Script de nettoyage du cache Next.js
# Usage: ./scripts/clean-cache.sh

echo "🧹 Nettoyage du cache Next.js..."

# Arrêter tous les processus Next.js
echo "⏹️  Arrêt des serveurs Next.js en cours..."
pkill -f "next dev" 2>/dev/null || echo "Aucun serveur Next.js à arrêter"

# Attendre que les processus se terminent
sleep 2

# Supprimer les dossiers de cache
echo "🗑️  Suppression des fichiers de cache..."
rm -rf .next
rm -rf out
rm -rf .turbopack
rm -rf node_modules/.cache

echo "✅ Cache nettoyé avec succès !"
echo ""
echo "💡 Pour redémarrer le serveur :"
echo "   pnpm dev"

#!/bin/bash

# Script de génération d'icônes PWA pour CareCompanion
# Nécessite ImageMagick installé : sudo apt install imagemagick (Ubuntu/Debian)

echo "🎨 Génération des icônes PWA pour CareCompanion..."

# Vérifier si ImageMagick est installé
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick n'est pas installé."
    echo "Installation : sudo apt install imagemagick (Ubuntu/Debian)"
    echo "              brew install imagemagick (macOS)"
    exit 1
fi

# Créer l'icône 512x512 avec dégradé violet->teal et cœur
convert -size 512x512 \
    gradient:'#8b5cf6-#14b8a6' \
    -fill white \
    -font Arial-Bold -pointsize 300 \
    -gravity center \
    -annotate +0+0 '♥' \
    public/icon-512.png

echo "✅ icon-512.png créé"

# Créer l'icône 192x192 (redimensionnement)
convert public/icon-512.png -resize 192x192 public/icon-192.png

echo "✅ icon-192.png créé"

# Créer l'icône Apple Touch (180x180)
convert public/icon-512.png -resize 180x180 public/apple-touch-icon.png

echo "✅ apple-touch-icon.png créé"

# Créer favicon.ico (multi-résolution)
convert public/icon-512.png \
    \( -clone 0 -resize 16x16 \) \
    \( -clone 0 -resize 32x32 \) \
    \( -clone 0 -resize 48x48 \) \
    -delete 0 public/favicon.ico

echo "✅ favicon.ico créé"

echo ""
echo "🎉 Toutes les icônes ont été générées avec succès !"
echo ""
echo "📂 Fichiers créés :"
echo "   - public/icon-512.png"
echo "   - public/icon-192.png"
echo "   - public/apple-touch-icon.png"
echo "   - public/favicon.ico"
echo ""
echo "🚀 Prochaines étapes :"
echo "   1. Vérifier les icônes dans public/"
echo "   2. Rebuild l'app : npm run build"
echo "   3. Tester PWA : Chrome DevTools > Application > Manifest"

#!/bin/bash

# Script de test pour vérifier que le fix des stats fonctionne

echo "🧪 Test du Fix Stats Flash"
echo "=========================="
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Vérifier que le serveur tourne
echo "1. Vérification du serveur..."
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Serveur accessible${NC}"
else
    echo -e "${RED}❌ Serveur non accessible sur http://localhost:3000${NC}"
    echo "   Lancez 'pnpm dev' d'abord"
    exit 1
fi
echo ""

# Test 1: Stats sans userId (devrait retourner 0)
echo "2. Test stats sans userId..."
RESPONSE=$(curl -s http://localhost:3000/api/stats)
UPCOMING=$(echo $RESPONSE | jq -r '.upcomingAppointments')
if [ "$UPCOMING" = "0" ]; then
    echo -e "${GREEN}✅ Sans userId: 0 rendez-vous (normal)${NC}"
else
    echo -e "${YELLOW}⚠️  Sans userId: $UPCOMING rendez-vous${NC}"
fi
echo ""

# Test 2: Stats avec userId correct
echo "3. Test stats avec userId 'user-default-dev'..."
RESPONSE=$(curl -s "http://localhost:3000/api/stats?userId=user-default-dev")
UPCOMING=$(echo $RESPONSE | jq -r '.upcomingAppointments')
TOTAL_ARTICLES=$(echo $RESPONSE | jq -r '.totalArticles')
TOTAL_VIDEOS=$(echo $RESPONSE | jq -r '.totalVideos')

echo "   Articles: $TOTAL_ARTICLES"
echo "   Vidéos: $TOTAL_VIDEOS"
echo "   RDV à venir: $UPCOMING"

if [ "$UPCOMING" -gt "0" ]; then
    echo -e "${GREEN}✅ Avec userId: $UPCOMING rendez-vous trouvés${NC}"
else
    echo -e "${RED}❌ Avec userId: Aucun rendez-vous trouvé${NC}"
    echo "   Exécutez: npx tsx scripts/fix-user-ids.ts"
fi
echo ""

# Test 3: Vérifier les rendez-vous dans la DB
echo "4. Vérification des rendez-vous dans la base..."
APPOINTMENTS=$(curl -s "http://localhost:3000/api/appointments?userId=user-default-dev")
COUNT=$(echo $APPOINTMENTS | jq -r '.pagination.total')
echo "   Total rendez-vous pour 'user-default-dev': $COUNT"

if [ "$COUNT" -gt "0" ]; then
    echo -e "${GREEN}✅ $COUNT rendez-vous trouvés dans la base${NC}"
    echo ""
    echo "   Rendez-vous:"
    echo $APPOINTMENTS | jq -r '.appointments[] | "   - \(.title) (\(.date | split("T")[0]))"'
else
    echo -e "${RED}❌ Aucun rendez-vous trouvé${NC}"
    echo "   Exécutez: npx tsx scripts/fix-user-ids.ts"
fi
echo ""

# Résumé
echo "📋 Résumé"
echo "========="
if [ "$UPCOMING" -gt "0" ] && [ "$COUNT" -gt "0" ]; then
    echo -e "${GREEN}✅ Tout fonctionne correctement!${NC}"
    echo ""
    echo "🎯 Prochaines étapes:"
    echo "   1. Ouvrez http://localhost:3000/fix-userid.html"
    echo "   2. Cliquez sur 'Fixer l'userId'"
    echo "   3. Rechargez votre dashboard"
    echo "   4. Les stats devraient s'afficher correctement sans flash!"
else
    echo -e "${YELLOW}⚠️  Certains tests ont échoué${NC}"
    echo ""
    echo "🔧 Pour corriger:"
    echo "   1. Exécutez: npx tsx scripts/fix-user-ids.ts"
    echo "   2. Relancez ce test"
fi
echo ""

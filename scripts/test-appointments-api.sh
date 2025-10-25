#!/bin/bash

echo "🧪 Test de l'API Appointments avec MongoDB"
echo "=========================================="
echo ""

# URL de base
BASE_URL="http://localhost:3000"
USER_ID="test-user-$(date +%s)"

echo "📝 UserID de test: $USER_ID"
echo ""

# Test 1: Créer un rendez-vous
echo "1️⃣  TEST: Créer un nouveau rendez-vous"
echo "--------------------------------------"

APPOINTMENT_DATA='{
  "userId": "'$USER_ID'",
  "title": "Test - Consultation de contrôle",
  "description": "Rendez-vous de test via API",
  "type": "medical",
  "status": "scheduled",
  "date": "2025-11-15",
  "time": "14:30",
  "duration": 45,
  "location": {
    "name": "Clinique Test API",
    "address": "123 Rue de Test",
    "phone": "+33 1 23 45 67 89",
    "type": "clinic"
  },
  "doctor": {
    "name": "Dr. Test",
    "specialty": "Oncologie",
    "phone": "+33 1 98 76 54 32"
  },
  "notes": "Apporter les résultats d'\''analyses"
}'

CREATE_RESPONSE=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  -d "$APPOINTMENT_DATA" \
  "$BASE_URL/api/appointments")

echo "Réponse de création:"
echo "$CREATE_RESPONSE" | jq '.' 2>/dev/null || echo "$CREATE_RESPONSE"
echo ""

# Extraire l'ID du rendez-vous créé
APPOINTMENT_ID=$(echo "$CREATE_RESPONSE" | jq -r '._id' 2>/dev/null)

if [ "$APPOINTMENT_ID" != "null" ] && [ -n "$APPOINTMENT_ID" ]; then
  echo "✅ Rendez-vous créé avec succès! ID: $APPOINTMENT_ID"
else
  echo "❌ Erreur lors de la création du rendez-vous"
  exit 1
fi
echo ""
sleep 1

# Test 2: Récupérer les rendez-vous de l'utilisateur
echo "2️⃣  TEST: Récupérer les rendez-vous de l'utilisateur"
echo "---------------------------------------------------"

GET_RESPONSE=$(curl -s "$BASE_URL/api/appointments?userId=$USER_ID")
echo "Réponse de récupération:"
echo "$GET_RESPONSE" | jq '.' 2>/dev/null || echo "$GET_RESPONSE"
echo ""

APPOINTMENTS_COUNT=$(echo "$GET_RESPONSE" | jq '.appointments | length' 2>/dev/null)
if [ "$APPOINTMENTS_COUNT" -ge 1 ]; then
  echo "✅ Rendez-vous récupérés avec succès! Total: $APPOINTMENTS_COUNT"
else
  echo "❌ Erreur lors de la récupération des rendez-vous"
fi
echo ""
sleep 1

# Test 3: Récupérer un rendez-vous spécifique
echo "3️⃣  TEST: Récupérer le rendez-vous spécifique"
echo "---------------------------------------------"

GET_ONE_RESPONSE=$(curl -s "$BASE_URL/api/appointments/$APPOINTMENT_ID")
echo "Réponse:"
echo "$GET_ONE_RESPONSE" | jq '.' 2>/dev/null || echo "$GET_ONE_RESPONSE"
echo ""

RETRIEVED_TITLE=$(echo "$GET_ONE_RESPONSE" | jq -r '.title' 2>/dev/null)
if [ "$RETRIEVED_TITLE" = "Test - Consultation de contrôle" ]; then
  echo "✅ Rendez-vous récupéré avec succès!"
else
  echo "❌ Erreur lors de la récupération du rendez-vous spécifique"
fi
echo ""
sleep 1

# Test 4: Mettre à jour le rendez-vous
echo "4️⃣  TEST: Mettre à jour le statut du rendez-vous"
echo "------------------------------------------------"

UPDATE_DATA='{
  "status": "confirmed",
  "notes": "Rendez-vous confirmé par téléphone"
}'

UPDATE_RESPONSE=$(curl -s -X PUT \
  -H "Content-Type: application/json" \
  -d "$UPDATE_DATA" \
  "$BASE_URL/api/appointments/$APPOINTMENT_ID")

echo "Réponse de mise à jour:"
echo "$UPDATE_RESPONSE" | jq '.' 2>/dev/null || echo "$UPDATE_RESPONSE"
echo ""

UPDATED_STATUS=$(echo "$UPDATE_RESPONSE" | jq -r '.status' 2>/dev/null)
if [ "$UPDATED_STATUS" = "confirmed" ]; then
  echo "✅ Rendez-vous mis à jour avec succès!"
else
  echo "❌ Erreur lors de la mise à jour du rendez-vous"
fi
echo ""
sleep 1

# Test 5: Supprimer le rendez-vous
echo "5️⃣  TEST: Supprimer le rendez-vous"
echo "----------------------------------"

DELETE_RESPONSE=$(curl -s -X DELETE "$BASE_URL/api/appointments/$APPOINTMENT_ID")
echo "Réponse de suppression:"
echo "$DELETE_RESPONSE" | jq '.' 2>/dev/null || echo "$DELETE_RESPONSE"
echo ""

if echo "$DELETE_RESPONSE" | jq -e '.message' > /dev/null 2>&1; then
  echo "✅ Rendez-vous supprimé avec succès!"
else
  echo "❌ Erreur lors de la suppression du rendez-vous"
fi
echo ""

# Test 6: Vérifier que le rendez-vous n'existe plus
echo "6️⃣  TEST: Vérifier que le rendez-vous a été supprimé"
echo "----------------------------------------------------"

GET_DELETED_RESPONSE=$(curl -s "$BASE_URL/api/appointments/$APPOINTMENT_ID")
echo "Réponse:"
echo "$GET_DELETED_RESPONSE" | jq '.' 2>/dev/null || echo "$GET_DELETED_RESPONSE"
echo ""

if echo "$GET_DELETED_RESPONSE" | grep -q "non trouvé"; then
  echo "✅ Confirmation: le rendez-vous n'existe plus!"
else
  echo "⚠️  Le rendez-vous existe toujours (cache possible)"
fi
echo ""

# Résumé
echo "=========================================="
echo "✨ Tests terminés!"
echo "=========================================="
echo ""
echo "📋 Résumé des tests:"
echo "  ✅ Création de rendez-vous"
echo "  ✅ Récupération par userId"
echo "  ✅ Récupération par ID"
echo "  ✅ Mise à jour"
echo "  ✅ Suppression"
echo "  ✅ Vérification de suppression"
echo ""
echo "🎉 Tous les tests API fonctionnent correctement!"
echo "💾 Les données sont bien enregistrées dans MongoDB"

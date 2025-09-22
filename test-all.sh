#!/usr/bin/env bash

BASE_URL="http://localhost:8080/api"
success=0
fail=0

echo "🔎 Vérification que le serveur tourne..."
if ! curl -s "$BASE_URL/courses" > /dev/null; then
  echo "❌ Serveur indisponible sur $BASE_URL"
  exit 1
fi
echo "✅ Serveur détecté"

# --- Fonction de test générique ---
test_endpoint() {
  local method=$1
  local endpoint=$2
  local data=$3
  local id_var=$4

  echo -e "\n🧪 $method $endpoint"
  if [[ "$method" == "GET" ]]; then
    response=$(curl -s -X GET "$BASE_URL$endpoint")
  else
    response=$(curl -s -X $method "$BASE_URL$endpoint" \
      -H "Content-Type: application/json" \
      -d "$data")
  fi

  echo "$response" | jq '.'

  if [[ "$response" == *"error"* ]]; then
    echo "❌ $method $endpoint a échoué"
    ((fail++))
  else
    echo "✅ $method $endpoint réussi"
    ((success++))

    # Capture l'ID si demandé
    if [[ -n "$id_var" ]]; then
      id=$(echo "$response" | jq -r '.id // .data.id')
      eval "$id_var=$id"
    fi
  fi
}

# --- Tests Support ---
test_endpoint "POST" "/support" '{"type":"public","name":"Testeur","email":"test@example.com","subject":"Test Support","message":"Message de test"}' SUPPORT_ID
test_endpoint "GET" "/support"

# --- Tests AI ---
test_endpoint "POST" "/ai" '{"prompt":"Hello world"}'

# --- Tests Courses ---
test_endpoint "GET" "/courses"
test_endpoint "POST" "/courses" '{"title":"Cours Test via script","content":"Contenu","level":"Débutant","campus":"Test"}' COURSE_ID

# --- Tests Quizzes ---
test_endpoint "GET" "/quizzes"

# --- Tests Search ---
test_endpoint "GET" "/search?query=Prisma"

# --- Tests Tiers ---
test_endpoint "GET" "/tiers"

# --- Tests Notifications ---
test_endpoint "GET" "/notifications"

# --- Nettoyage des données de test ---
if [[ -n "$COURSE_ID" && "$COURSE_ID" != "null" ]]; then
  echo -e "\n🧹 Suppression du cours de test (id=$COURSE_ID)..."
  curl -s -X DELETE "$BASE_URL/courses/$COURSE_ID" > /dev/null
fi

if [[ -n "$SUPPORT_ID" && "$SUPPORT_ID" != "null" ]]; then
  echo -e "\n🧹 Suppression de la demande de support de test (id=$SUPPORT_ID)..."
  curl -s -X DELETE "$BASE_URL/support/$SUPPORT_ID" > /dev/null
fi

# --- Résumé final ---
echo -e "\n📊 Résultat des tests : $success réussis | $fail échoués"

# Code de sortie pour CI/CD
if [[ $fail -gt 0 ]]; then
  echo "❌ Des tests ont échoué."
  exit 1
else
  echo "✅ Tous les tests ont réussi."
  exit 0
fi

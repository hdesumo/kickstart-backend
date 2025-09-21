#!/bin/bash
echo "🔎 Lancement des tests complets Kickstart Campus..."

BASE_URL="http://localhost:8080"
API_URL="$BASE_URL/api"

# Compteurs
success=0
fail=0

# Vérification du serveur
echo -e "\n🟢 Vérification du serveur..."
root_status=$(curl -s -w "%{http_code}" -o /tmp/root.json "$BASE_URL/")
if [[ $root_status == 2* ]]; then
  echo "✅ Serveur actif ($root_status)"
  cat /tmp/root.json | jq
  ((success++))
else
  echo "❌ Serveur injoignable (HTTP $root_status). Abandon des tests."
  ((fail++))
  cat /tmp/root.json
  echo -e "\n📊 Rapport final : $success tests réussis ✅ | $fail échecs ❌"
  exit 1
fi

# Fonction de test avec comptage
test_endpoint() {
  local method=$1
  local endpoint=$2
  local data=$3

  echo -e "\n➡️ $method $endpoint"
  
  if [ -z "$data" ]; then
    response=$(curl -s -w "%{http_code}" -o /tmp/response.json -X $method "$API_URL$endpoint")
  else
    response=$(curl -s -w "%{http_code}" -o /tmp/response.json -X $method "$API_URL$endpoint" \
      -H "Content-Type: application/json" -d "$data")
  fi

  if [[ $response == 2* ]]; then
    echo "✅ $response"
    cat /tmp/response.json | jq
    ((success++))
  else
    echo "❌ $response"
    cat /tmp/response.json
    ((fail++))
  fi
}

### --- SUPPORT ---
echo -e "\n📮 TEST SUPPORT"
test_endpoint "POST" "/support" '{"type":"public","name":"Jean Dupont","email":"jean.dupont@example.com","subject":"Problème de connexion","message":"Je n’arrive pas à accéder à mon compte."}'
test_endpoint "GET" "/support"
test_endpoint "GET" "/support/1"

### --- IA ---
echo -e "\n🤖 TEST IA"
test_endpoint "POST" "/ai/suggest" '{"prompt":"Propose trois idées innovantes pour des projets étudiants en Afrique."}'

### --- COURSES ---
echo -e "\n📚 TEST COURSES"
test_endpoint "GET" "/courses"

### --- QUIZZES ---
echo -e "\n📝 TEST QUIZZES"
test_endpoint "GET" "/quizzes"

### --- SEARCH ---
echo -e "\n🔍 TEST SEARCH"
test_endpoint "GET" "/search/suggestions"

### --- TIERS ---
echo -e "\n💎 TEST TIERS"
test_endpoint "GET" "/tiers"

### --- NOTIFICATIONS ---
echo -e "\n🔔 TEST NOTIFICATIONS"
test_endpoint "GET" "/notifications"

# Rapport final
echo -e "\n📊 Rapport final : $success tests réussis ✅ | $fail échecs ❌"
if [[ $fail -gt 0 ]]; then
  echo "⚠️  Des erreurs ont été détectées, vérifie les logs ci-dessus."
else
  echo "🎉 Tous les tests sont passés avec succès !"
fi

#!/bin/bash
echo "🔎 Lancement des tests du site vitrine Kickstart Campus..."

# URL de la vitrine (à adapter si nécessaire)
FRONTEND_URL="https://kickstart-campus.com"

success=0
fail=0

# Fonction de test de page
test_page() {
  local path=$1
  local expected=$2

  echo -e "\n➡️ Test de la page $FRONTEND_URL$path"
  html=$(curl -s -w "%{http_code}" -o /tmp/page.html "$FRONTEND_URL$path")
  
  if [[ $html == 2* ]]; then
    echo "✅ HTTP $html"
    if grep -qi "$expected" /tmp/page.html; then
      echo "✅ Contenu attendu trouvé : \"$expected\""
      ((success++))
    else
      echo "⚠️  HTTP OK mais contenu \"$expected\" non trouvé"
      ((fail++))
    fi
  else
    echo "❌ Échec : code HTTP $html"
    ((fail++))
  fi
}

# Pages principales à tester
test_page "/" "Kickstart Campus"
test_page "/fr" "Kickstart Campus"      # Vérifie la version FR
test_page "/en" "Kickstart Campus"      # Vérifie la version EN
test_page "/(student)/dashboard" "Dashboard"
test_page "/(student)/projects" "Projects"
test_page "/(student)/wallet" "Wallet"
test_page "/(student)/profile" "Profile"

echo -e "\n📊 Rapport final : $success pages OK ✅ | $fail erreurs ❌"
if [[ $fail -gt 0 ]]; then
  echo "⚠️  Vérifie les pages en erreur ci-dessus."
else
  echo "🎉 Toutes les pages de la vitrine sont accessibles !"
fi

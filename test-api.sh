#!/bin/bash
BASE_URL="https://api.kickstart-campus.com"

echo "🔎 Test API Kickstart Campus..."
for ENDPOINT in "courses" "quizzes" "search/suggestions" "tiers"
do
  echo -e "\n➡️ GET /api/$ENDPOINT"
  curl -s "$BASE_URL/api/$ENDPOINT" | jq
done

echo -e "\n✅ Tests terminés."

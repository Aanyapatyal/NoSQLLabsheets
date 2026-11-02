#!/usr/bin/env bash
# Q3. User profiles and preferences
set -euo pipefail
BASE="${RIAK_URL:-http://localhost:8098}"
BUCKET="user_profiles"

# PUT profile and preferences as one JSON value
curl -i -X PUT "$BASE/buckets/$BUCKET/keys/U001" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Aanya",
    "email":"aanya@example.com",
    "city":"Haridwar",
    "preferences":{
      "language":"English",
      "theme":"dark",
      "notifications":{"email":true,"sms":false}
    }
  }'

# GET profile
curl -i "$BASE/buckets/$BUCKET/keys/U001"

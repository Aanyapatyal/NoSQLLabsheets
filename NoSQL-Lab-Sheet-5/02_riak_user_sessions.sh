#!/usr/bin/env bash
# Q2. Store and retrieve user session information
set -euo pipefail
BASE="${RIAK_URL:-http://localhost:8098}"
BUCKET="user_sessions"

curl -i -X PUT "$BASE/buckets/$BUCKET/keys/SESSION001" \
  -H "Content-Type: application/json" \
  -d '{
    "session_id":"SESSION001",
    "user_id":"U001",
    "login_time":"2026-11-02T08:00:00Z",
    "status":"active"
  }'

# Retrieve using the session key
curl -i "$BASE/buckets/$BUCKET/keys/SESSION001"

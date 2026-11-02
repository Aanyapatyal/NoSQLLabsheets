#!/usr/bin/env bash
# Q5. String, JSON document and list values
set -euo pipefail
BASE="${RIAK_URL:-http://localhost:8098}"
BUCKET="value_types"

# String value
curl -i -X PUT "$BASE/buckets/$BUCKET/keys/greeting" \
  -H "Content-Type: text/plain" \
  --data-binary 'Hello Riak'

# JSON document
curl -i -X PUT "$BASE/buckets/$BUCKET/keys/student" \
  -H "Content-Type: application/json" \
  -d '{"id":1,"name":"Aanya","course":"BCA"}'

# JSON list
curl -i -X PUT "$BASE/buckets/$BUCKET/keys/colors" \
  -H "Content-Type: application/json" \
  -d '["red","green","blue"]'

# Retrieve values
curl -i "$BASE/buckets/$BUCKET/keys/greeting"
curl -i "$BASE/buckets/$BUCKET/keys/student"
curl -i "$BASE/buckets/$BUCKET/keys/colors"

# Explanation:
# Bucket = namespace/container for related keys.
# Key = unique identifier for a value inside a bucket.
# Value = opaque data stored at that bucket/key (string, JSON, list, etc.).

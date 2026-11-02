#!/usr/bin/env bash
# Q1. Riak KV setup checklist and Student key-value CRUD
# Before running: install/start Riak using the instructions for your Linux distribution.
# Confirm Riak HTTP API is reachable at localhost:8098.
set -euo pipefail

BASE="${RIAK_URL:-http://localhost:8098}"
BUCKET="students"

echo "Checking Riak HTTP API..."
curl -fsS "$BASE/ping"
echo

# Create/store a student record (Riak buckets are created on first write).
curl -i -X PUT "$BASE/buckets/$BUCKET/keys/101" \
  -H "Content-Type: application/json" \
  -d '{"roll_no":101,"name":"Aanya","department":"BCA","semester":5,"cgpa":9.2}'

# Retrieve
curl -i "$BASE/buckets/$BUCKET/keys/101"

# Update by writing the new value to the same bucket/key
curl -i -X PUT "$BASE/buckets/$BUCKET/keys/101" \
  -H "Content-Type: application/json" \
  -d '{"roll_no":101,"name":"Aanya","department":"BCA","semester":6,"cgpa":9.3}'

# Retrieve updated value
curl -i "$BASE/buckets/$BUCKET/keys/101"

# Insert another student
curl -i -X PUT "$BASE/buckets/$BUCKET/keys/102" \
  -H "Content-Type: application/json" \
  -d '{"roll_no":102,"name":"Riya","department":"BCA","semester":4,"cgpa":8.8}'

# Delete
curl -i -X DELETE "$BASE/buckets/$BUCKET/keys/101"

# Verify deletion (expect 404/not found)
curl -i "$BASE/buckets/$BUCKET/keys/101"

#!/usr/bin/env bash
# Q4. Shopping cart stored as one JSON value per user.
# Each PUT replaces the value at the same key; the client reads, modifies and writes it.
set -euo pipefail
BASE="${RIAK_URL:-http://localhost:8098}"
BUCKET="shopping_carts"

# Add products: initial cart
curl -i -X PUT "$BASE/buckets/$BUCKET/keys/U001" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id":"U001",
    "items":[
      {"product_id":"P101","quantity":1,"price":800},
      {"product_id":"P102","quantity":2,"price":400}
    ],
    "total":1600
  }'

# Retrieve cart
curl -i "$BASE/buckets/$BUCKET/keys/U001"

# Update quantity and total (client-side read/modify/write example)
curl -i -X PUT "$BASE/buckets/$BUCKET/keys/U001" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id":"U001",
    "items":[
      {"product_id":"P101","quantity":1,"price":800},
      {"product_id":"P102","quantity":3,"price":400}
    ],
    "total":2000
  }'

# Remove P101; update total accordingly
curl -i -X PUT "$BASE/buckets/$BUCKET/keys/U001" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id":"U001",
    "items":[
      {"product_id":"P102","quantity":3,"price":400}
    ],
    "total":1200
  }'

# Retrieve final cart
curl -i "$BASE/buckets/$BUCKET/keys/U001"

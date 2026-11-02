#!/usr/bin/env bash
# Q9. Query-by-data using application-side filtering.
# This simple lab retrieves a small set of known keys and filters JSON with jq.
# It does not scan all Riak keys: key listing/secondary-index capabilities depend
# on Riak configuration/version and are not a substitute for a purpose-built index.
set -euo pipefail
BASE="${RIAK_URL:-http://localhost:8098}"
BUCKET="user_records"

curl -fsS -X PUT "$BASE/buckets/$BUCKET/keys/U001" \
  -H "Content-Type: application/json" \
  -d '{"name":"Aanya","age":19,"city":"Haridwar","preferences":["music","coding"]}' >/dev/null
curl -fsS -X PUT "$BASE/buckets/$BUCKET/keys/U002" \
  -H "Content-Type: application/json" \
  -d '{"name":"Riya","age":20,"city":"Delhi","preferences":["reading"]}' >/dev/null
curl -fsS -X PUT "$BASE/buckets/$BUCKET/keys/U003" \
  -H "Content-Type: application/json" \
  -d '{"name":"Rahul","age":21,"city":"Haridwar","preferences":["sports","coding"]}' >/dev/null

# Application knows the keys and retrieves each object, then filters.
for key in U001 U002 U003; do
  curl -fsS "$BASE/buckets/$BUCKET/keys/$key"
  echo
done | jq -s '.[] | select(.city == "Haridwar")'

# Find age >= 20 among the retrieved records
for key in U001 U002 U003; do
  curl -fsS "$BASE/buckets/$BUCKET/keys/$key"
  echo
done | jq -s '.[] | select(.age >= 20)'

# For larger datasets, maintain a searchable index or use a supported secondary-index/
# search facility configured for your Riak edition/version.

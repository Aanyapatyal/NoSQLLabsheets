#!/usr/bin/env bash
# Q7. Multiple buckets and bulk key-value insertion
# Run against a Riak cluster to demonstrate distribution across nodes.
set -euo pipefail
BASE="${RIAK_URL:-http://localhost:8098}"

for bucket in students products events; do
  for i in $(seq 1 100); do
    key="${bucket}_${i}"
    body=$(printf '{"id":%d,"bucket":"%s","value":"sample-%d"}' "$i" "$bucket" "$i")
    curl -fsS -X PUT "$BASE/buckets/$bucket/keys/$key" \
      -H "Content-Type: application/json" \
      -d "$body" >/dev/null
  done
  echo "Inserted 100 records into $bucket"
done

# Retrieve sample records
curl -i "$BASE/buckets/students/keys/students_1"
curl -i "$BASE/buckets/events/keys/events_100"

# Riak partitions the keyspace into virtual nodes (vnodes) on the cluster.
# Replicas are placed on multiple physical nodes according to ring ownership.
# Add nodes to a cluster to increase capacity; inspect cluster status with
# riak-admin cluster status on the appropriate Riak node.

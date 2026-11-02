#!/usr/bin/env bash
# Q6. Riak read/write quorum examples
# Riak quorum parameters are supplied as query parameters on object operations.
# N = number of replicas for the bucket; R = read quorum; W = write quorum.
# This example requests quorum behavior; exact accepted values depend on bucket N and version.
set -euo pipefail
BASE="${RIAK_URL:-http://localhost:8098}"
BUCKET="quorum_demo"
KEY="record1"

# Write with W=quorum
curl -i -X PUT "$BASE/buckets/$BUCKET/keys/$KEY?w=quorum" \
  -H "Content-Type: application/json" \
  -d '{"message":"written with quorum","value":1}'

# Read with R=quorum
curl -i "$BASE/buckets/$BUCKET/keys/$KEY?r=quorum"

# Example stronger settings, if the bucket has enough replicas:
# curl -X PUT "$BASE/buckets/$BUCKET/keys/$KEY?w=all" -H "Content-Type: application/json" -d '{"value":2}'
# curl "$BASE/buckets/$BUCKET/keys/$KEY?r=all"

# Riak uses replication and tunable read/write quorums. Quorum settings trade
# availability/latency against the number of replicas that must respond.
# A quorum read/write does not make arbitrary multi-key operations transactional.

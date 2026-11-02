#!/usr/bin/env bash
# Q10. Riak Set CRDT operations.
# Requires Riak KV bucket types / CRDT data types support and an enabled set bucket type.
# Create/activate the bucket type using the commands supported by your Riak release.
# Common Riak KV releases use the "sets" bucket type for set data types.
set -euo pipefail
BASE="${RIAK_URL:-http://localhost:8098}"

# Example bucket type activation (run with riak-admin on a Riak node, not in this shell):
# riak-admin bucket-type create sets '{"props":{"datatype":"set"}}'
# riak-admin bucket-type activate sets

# Add values to a set using the HTTP datatype API.
curl -i -X POST "$BASE/types/sets/buckets/user_interests/datatypes/U001" \
  -H "Content-Type: application/json" \
  -d '{"add":["music","coding","travel"]}'

# Retrieve set
curl -i "$BASE/types/sets/buckets/user_interests/datatypes/U001"

# Add and remove elements
curl -i -X POST "$BASE/types/sets/buckets/user_interests/datatypes/U001" \
  -H "Content-Type: application/json" \
  -d '{"add":["photography"],"remove":["travel"]}'

# Retrieve updated set
curl -i "$BASE/types/sets/buckets/user_interests/datatypes/U001"

# Membership/common-element operations are typically performed by reading set values
# and evaluating membership/intersection in application code.
# For two sets, retrieve both and compute intersection in the client.

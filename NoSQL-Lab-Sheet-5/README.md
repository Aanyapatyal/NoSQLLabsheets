# NoSQL Database Design — Lab Sheet 5 (Riak KV and Neo4j)

This project contains practical examples for all 15 questions:
- Riak KV key-value operations, JSON records, quorum settings, scaling concepts,
  transaction-like application logic, query-by-data, and set operations.
- Neo4j graph creation, Cypher queries, transactions, and a Python CRUD application.

## Requirements

### Riak KV practicals (Q1–Q10)
- Linux system
- Riak KV installation compatible with your Linux distribution
- Riak HTTP API enabled (default local HTTP port is commonly `8098`)
- `curl`
- Optional: `jq` for readable JSON output

Riak KV releases and deployment packaging differ. Follow the installation instructions
for the exact Riak KV version you install. Confirm the HTTP API and ports in your
`riak.conf` before using the examples.

### Neo4j practicals (Q11–Q15)
- Neo4j Desktop or Neo4j Server
- Neo4j Browser or Cypher Shell
- Python 3 for Q15
- Python Neo4j driver: `pip install -r requirements.txt`

## Riak API notes

The examples use the Riak KV HTTP API with URL pattern:
`http://localhost:8098/buckets/<bucket>/keys/<key>`

For production deployments, use TLS/authentication where configured, avoid exposing
Riak's HTTP API publicly, and verify bucket properties for your installed release.

Riak KV is a distributed key-value database, not a relational transaction database.
Multi-key operations in these exercises are application-level sequences and are not
atomic transactions.

## Neo4j notes

Run `.cypher` files in Neo4j Browser or Cypher Shell. The Python program uses Bolt
(default `bolt://localhost:7687`) and environment variables for credentials.

## File list

1. `01_riak_students.sh` — Install/configuration checklist and student bucket CRUD
2. `02_riak_user_sessions.sh` — Session records
3. `03_riak_user_profiles.sh` — Profiles and preferences
4. `04_riak_shopping_cart.sh` — Shopping cart operations
5. `05_riak_value_types.sh` — Strings, JSON and lists
6. `06_riak_quorums.sh` — Read/write quorum examples
7. `07_riak_scaling.sh` — Multiple buckets and bulk key insertion
8. `08_riak_transaction_like.md` — Multi-operation workflow and limitations
9. `09_riak_query_by_data.sh` — Application-side filtering
10. `10_riak_sets.sh` — Set operations using Riak Set CRDT API (where supported)
11. `11_neo4j_academic_graph.cypher` — Student, Course and Department graph
12. `12_neo4j_social_network.cypher` — Person social network
13. `13_neo4j_ecommerce_graph.cypher` — E-commerce graph
14. `14_neo4j_transactions.cypher` — Transaction and consistency demonstration
15. `15_neo4j_python_app.py` — Python CRUD and relationship queries
16. `requirements.txt` — Python dependency

Run scripts only in your own lab environment. Replace example credentials, hosts and
ports with your local configuration. Add your own execution screenshots and outputs
to your laboratory report.

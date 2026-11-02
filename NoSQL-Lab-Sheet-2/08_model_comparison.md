# Q8 — Comparison: MongoDB, Cassandra and Neo4j

| Feature | MongoDB | Cassandra | Neo4j |
|---|---|---|---|
| Data model | Document | Wide-column | Graph |
| Storage | BSON documents in collections | Rows partitioned by partition key, columns | Nodes, relationships and properties |
| Query method | MQL / aggregation pipeline | CQL | Cypher |
| Scalability | Horizontal sharding; replica sets | Distributed peer-to-peer architecture | Clustering and graph-aware deployment options |
| Strength | Flexible records and nested documents | High write throughput and availability across nodes | Relationship traversal and connected data |
| Suitable applications | Catalogues, profiles, content systems | Time-series, event and high-volume distributed workloads | Social networks, recommendations, fraud and network analysis |

## Summary
MongoDB is useful when records are naturally represented as flexible documents.
Cassandra is useful for large distributed workloads requiring high availability and
predictable query patterns.
Neo4j is useful when relationships between entities are central to the application.

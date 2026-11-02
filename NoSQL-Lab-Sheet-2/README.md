# NoSQL Database Design — Lab Sheet 2

This repository contains sample scripts and practical notes for all 15 questions.

## Folder contents

| File | Practical |
|---|---|
| `01_mysql_student.sql` | RDBMS student table, five records, comparison query |
| `01_mongodb_student_model.js` | Equivalent MongoDB document model |
| `02_collegedb_crud.js` | CollegeDB Students CRUD |
| `03_orders_embedded_aggregation.js` | Embedded order documents and aggregation |
| `04_redis_students.redis` | Redis key-value student operations |
| `05_cassandra_students.cql` | Cassandra keyspace/table and CRUD |
| `06_hbase_students.hbase` | HBase table, inserts, reads, updates, deletes |
| `07_neo4j_student_course.cypher` | Student–Course graph and relationship queries |
| `08_model_comparison.md` | MongoDB, Cassandra and Neo4j comparison |
| `09_single_server_mongodb.js` | Local MongoDB CRUD demonstration |
| `10_sharding_mongodb.js` | MongoDB sharding setup and sample distribution |
| `11_replica_set_mongodb.md` | Primary–Secondary replication lab |
| `12_cassandra_peer_replication.md` | Cassandra peer-to-peer replication lab |
| `13_sharding_replication_architecture.md` | Sharding plus replication design |
| `14_mapreduce_students.js` | MongoDB MapReduce example |
| `15_distribution_models.md` | Architecture, failure handling, advantages and limitations |

## Requirements

Install only the database software needed for the practical you are running:

- MySQL Server and MySQL Workbench or MySQL CLI
- MongoDB Server and `mongosh`
- Redis Server and `redis-cli`
- Apache Cassandra and `cqlsh`
- Apache HBase and HBase Shell
- Neo4j Desktop/Server and Cypher Shell or Neo4j Browser
- Python 3 (optional, for additional data analysis)

## Running the scripts

### MySQL
```bash
mysql -u root -p < 01_mysql_student.sql
```

### MongoDB
Start MongoDB Server, then run:
```bash
mongosh --file 01_mongodb_student_model.js
mongosh --file 02_collegedb_crud.js
mongosh --file 03_orders_embedded_aggregation.js
mongosh --file 09_single_server_mongodb.js
```

### Redis
Start Redis Server, then run commands in `04_redis_students.redis` using `redis-cli`.
For example:
```bash
redis-cli
```
Paste the commands from the file one by one.

### Cassandra
Start Cassandra and run:
```bash
cqlsh -f 05_cassandra_students.cql
```

### HBase
Start HBase and its required services, open `hbase shell`, and paste commands from `06_hbase_students.hbase` one by one.

### Neo4j
Open Neo4j Browser or Cypher Shell and run `07_neo4j_student_course.cypher`.

## Important notes about distributed practicals

Questions 10–13 require multiple MongoDB/Cassandra processes or nodes and are not equivalent to simply running a single local database. The included guides provide configuration examples and verification commands. You need separate ports, data directories, and/or machines/containers, and must follow the instructions for your installed database version.

- Q10: MongoDB sharding requires a config server replica set, shard replica set(s), and `mongos`.
- Q11: MongoDB primary-secondary replication is implemented with a replica set (not the old standalone master-slave mode).
- Q12: Cassandra is peer-to-peer; replication is configured through the keyspace replication factor.
- Q13: MongoDB sharding and replication are commonly combined by making each shard a replica set.

Do not run destructive commands against databases containing important data. Use a lab-only environment.

## Screenshots and lab report

The scripts are examples, not proof of execution. Run each practical in your own environment and add your actual terminal/Compass/Browser screenshots, outputs, observations, and conclusion to your report.

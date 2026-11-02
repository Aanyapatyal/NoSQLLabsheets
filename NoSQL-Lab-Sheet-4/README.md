# NoSQL Database Design — Lab Sheet 4 (HBase and Cassandra)

This repository contains HBase Shell and Cassandra CQL examples for all 15 questions.

## Requirements
- Java version supported by your chosen Apache HBase release
- Apache Hadoop/HDFS if using a distributed HBase deployment (standalone mode can be used for a basic local lab)
- Apache HBase and HBase Shell
- Apache Cassandra and `cqlsh`

Always check the installation guide for the exact versions you install. HBase and Hadoop/Java compatibility is version-dependent.

## How to run
- Files ending in `.hbase`: open `hbase shell` and paste commands in order.
- Files ending in `.cql`: run with `cqlsh -f filename.cql` or paste into `cqlsh`.
- Files ending in `.md`: configuration and explanation notes.

## Files
1. `01_hbase_student.hbase` — Student table and five records
2. `02_hbase_employee_crud.hbase` — Employee CRUD
3. `03_hbase_event_logging.hbase` — Event logging
4. `04_hbase_cms.hbase` — Content management
5. `05_hbase_blog.hbase` — Blogging platform
6. `06_hbase_column_family_model.hbase` — Column-family and qualifier model
7. `07_hbase_website_counter.hbase` — Atomic page counters
8. `08_hbase_sessions_ttl.hbase` — Session table with TTL
9. `09_hbase_rowkey_scaling.hbase` — Salted row keys
10. `10_hbase_regions.md` — Pre-split regions and RegionServers
11. `11_cassandra_collegedb.cql` — CollegeDB and Students
12. `12_cassandra_employee_crud.cql` — Employee CRUD
13. `13_cassandra_event_logging.cql` — User/time event queries
14. `14_cassandra_consistency.md` — ONE, QUORUM and ALL
15. `15_column_oriented_application.md` — Integrated HBase/Cassandra application and comparison

## Safety and execution notes
- The scripts use lab-specific table/keyspace names. Some files drop/recreate their own tables; read the commands before running.
- HBase `scan` and Cassandra `ALLOW FILTERING` are useful for small lab datasets but are not recommended for large production tables.
- Cassandra queries must be supported by the table's primary key. Model tables around the queries you need.
- Cassandra transactions are not general multi-row ACID transactions. Lightweight transactions (LWT) provide conditional operations with Paxos and have different performance/consistency characteristics.
- HBase row mutations are atomic within one row, not across arbitrary rows.
- HBase TTL is configured in seconds and expired cells are removed during compaction; expiration may not immediately reclaim disk space.
- Region split and placement are managed by HBase. RegionServers host regions; HMaster coordinates assignments and balancing.

Add your own execution screenshots and outputs to your lab report after running the commands.

# Q12 — Cassandra Peer-to-Peer Replication

Cassandra nodes are peers; there is no single permanent primary/master. A coordinator
node accepts a client request and routes it to the replicas responsible for the data.

## Example keyspace
Run in `cqlsh` on a Cassandra cluster with at least three nodes:

```sql
CREATE KEYSPACE IF NOT EXISTS PeerLab
WITH replication = {
  'class': 'NetworkTopologyStrategy',
  'datacenter1': 3
};

USE PeerLab;

CREATE TABLE IF NOT EXISTS Students (
  Student_ID int PRIMARY KEY,
  Name text,
  Course text,
  Marks double
);

INSERT INTO Students (Student_ID, Name, Course, Marks)
VALUES (1, 'Aanya', 'BCA', 91.5);

SELECT * FROM Students;
```

The replication factor of 3 means three replicas per partition in `datacenter1`,
assuming the datacenter has at least three suitable nodes.

## Verify
Use `nodetool status` on nodes to inspect cluster membership. Use `nodetool ring`
where supported to inspect token ownership. Query through different coordinator nodes
and verify that the same row is available.

## Peer-to-peer vs master-secondary
- Cassandra: all nodes are peers; coordinator role is request-specific; replicas are
  selected by token ownership and replication strategy.
- Master-secondary: writes generally go through the primary; secondaries replicate
  from it and may be promoted after failure.

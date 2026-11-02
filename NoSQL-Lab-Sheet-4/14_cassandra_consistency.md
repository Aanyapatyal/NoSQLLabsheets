# Q14 — Cassandra Availability and Consistency

Cassandra uses tunable consistency. A client specifies how many replicas must
acknowledge a read or write. The result depends on replication factor, node health,
and the selected consistency level.

## Create a replicated keyspace
For a multi-node cluster with a datacenter named `datacenter1`:

```sql
CREATE KEYSPACE IF NOT EXISTS ConsistencyLab
WITH replication = {
  'class': 'NetworkTopologyStrategy',
  'datacenter1': 3
};

USE ConsistencyLab;

CREATE TABLE IF NOT EXISTS Students (
  student_id int PRIMARY KEY,
  name text,
  marks int
);
```

For a single-node practice environment, use `SimpleStrategy` with replication factor
1 instead. That cannot demonstrate replica-level availability tradeoffs.

## Set consistency in cqlsh
Run the following in `cqlsh`:

```sql
CONSISTENCY ONE;
INSERT INTO Students (student_id, name, marks) VALUES (1, 'Aanya', 91);
SELECT * FROM Students WHERE student_id = 1;

CONSISTENCY QUORUM;
UPDATE Students SET marks = 95 WHERE student_id = 1;
SELECT * FROM Students WHERE student_id = 1;

CONSISTENCY ALL;
SELECT * FROM Students WHERE student_id = 1;
```

## Explanation (RF = 3)
- ONE: one replica acknowledgement is enough. Higher availability/low latency, but
  weaker read/write consistency guarantees.
- QUORUM: a majority of replicas must respond. With RF=3, quorum is 2. A quorum read
  and quorum write overlap in at least one replica, supporting strong consistency
  for that operation under the relevant conditions.
- ALL: all replicas must respond. Strongest acknowledgement requirement among these
  levels, but least available if any replica is down.

## Observation
On a real three-node cluster, stop one node and compare ONE, QUORUM and ALL operations.
With RF=3, ONE and QUORUM can often continue with one unavailable replica; ALL fails
if any required replica is unavailable. Exact outcomes also depend on which replicas
are reachable and the consistency level of the operation.

Do not claim to have demonstrated this on a single-node installation: with RF=1,
ONE, QUORUM and ALL effectively require the only replica.

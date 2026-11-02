# Q15 — Database Distribution Models

## 1. Single Server

```text
Clients ---> One database server ---> Local storage
```
- Data distribution: all data and requests are handled by one server.
- Failure handling: server failure makes the database unavailable until recovery.
- Advantage: simple to install, manage and debug.
- Limitation: limited vertical capacity; single point of failure.
- Application: small college project or development database.

## 2. Sharding

```text
                 Router
                   |
          -------------------
          |        |        |
        Shard 1  Shard 2  Shard 3
```
- Data distribution: partitions of the dataset are placed on different shards using
  a shard key.
- Failure handling: sharding alone does not guarantee redundancy; replication can
  be added to each shard.
- Advantage: horizontal scaling of storage and workload.
- Limitation: shard-key choice and cross-shard queries add complexity.
- Application: large product catalogue or high-volume application dataset.

## 3. Master-Secondary Replication

```text
          Primary
          /     \
     Secondary Secondary
```
- Data distribution: secondaries maintain copies of data from the primary.
- Failure handling: an eligible secondary can be elected/promoted if quorum rules
  allow; clients reconnect to the new primary.
- Advantage: redundancy and read scaling in supported configurations.
- Limitation: primary is the normal write leader; replication lag may occur.
- Application: business application needing data redundancy.

## 4. Peer-to-Peer Replication

```text
       Node A ------ Node B
          \          /
             Node C
```
- Data distribution: data partitions are replicated among peer nodes according to
  the replication strategy.
- Failure handling: other replicas can serve requests when a node is unavailable,
  subject to consistency level and replica availability.
- Advantage: no permanent central master; distributed availability.
- Limitation: consistency, repair and data modelling require care.
- Application: globally distributed, high-write event or telemetry workloads.

## 5. Sharding + Replication

```text
                  Router
                 /      \
          Shard 1        Shard 2
        (replica set)  (replica set)
         P / S / S      P / S / S
```
- Data distribution: different shards hold different partitions; each shard has
  replicas.
- Failure handling: a shard replica set can elect a new primary; other shards
  continue serving their partitions.
- Advantage: horizontal scale plus fault tolerance.
- Limitation: operational complexity and shard-key/replica-set management.
- Application: large e-commerce, content or multi-tenant platforms.

## Conclusion
The appropriate model depends on data size, relationship patterns, availability,
consistency requirements, write/read workload and operational resources.

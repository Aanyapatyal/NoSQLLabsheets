# Q13 — Sharding + Replication Architecture

MongoDB commonly combines sharding and replication by making each shard a replica set.

## Logical architecture

```text
                    Applications
                         |
                       mongos
                         |
             -------------------------
             |                       |
        Shard A                  Shard B
      (Replica Set)            (Replica Set)
      Primary A                Primary B
       /     \                  /     \
   Secondary Secondary     Secondary Secondary

             Config Server Replica Set
             (cluster metadata)
```

## Lab design
1. Configure a config server replica set.
2. Configure two shard replica sets, each with a primary and at least one secondary.
3. Start `mongos` with the config server replica-set connection string.
4. Add the shard replica sets using `sh.addShard(...)`.
5. Enable sharding for the lab database.
6. Create at least 20 student records and shard the collection using a suitable shard key.
7. Verify with `sh.status()` and `db.Students.getShardDistribution()`.

Example commands after the cluster is running through mongos:

```javascript
sh.addShard("shardA/localhost:27101,localhost:27102,localhost:27103");
sh.addShard("shardB/localhost:27201,localhost:27202,localhost:27203");
sh.enableSharding("CombinedLab");
use CombinedLab
db.Students.insertMany(
  Array.from({length: 20}, (_, i) => ({
    Student_ID: i + 1,
    Name: "Student" + (i + 1),
    Course: i % 2 ? "BCA" : "BSc IT"
  }))
);
sh.shardCollection("CombinedLab.Students", {Student_ID: "hashed"});
sh.status();
db.Students.getShardDistribution();
```

Replace example hosts/ports with your actual node addresses and ensure the replica sets
are initialized before adding them.

## Benefits
- Sharding distributes data and workload across multiple shards for horizontal scaling.
- Replication provides redundancy and can maintain availability when a replica fails.
- Together, they support larger datasets and improved fault tolerance.

This is a topology guide, not an automatic one-command cluster installer.

# Q11 — MongoDB Primary–Secondary (Replica Set) Demonstration

MongoDB uses replica sets for primary-secondary replication. One member is elected
primary; secondary members replicate the primary's oplog. This is not the deprecated
standalone "master-slave" configuration.

## Example local topology
- Node 1: `localhost:27017` (data directory `data/rs1`)
- Node 2: `localhost:27018` (data directory `data/rs2`)
- Node 3: `localhost:27019` (data directory `data/rs3`)

Create separate data directories, then start three `mongod` processes with the same
replica set name, for example `rs0`, and their respective ports/dbpaths:

```bash
mongod --replSet rs0 --port 27017 --dbpath ./data/rs1 --bind_ip localhost
mongod --replSet rs0 --port 27018 --dbpath ./data/rs2 --bind_ip localhost
mongod --replSet rs0 --port 27019 --dbpath ./data/rs3 --bind_ip localhost
```

Run each server in a separate terminal. Connect to the first node:

```bash
mongosh --port 27017
```

Initialize the replica set:

```javascript
rs.initiate({
  _id: "rs0",
  members: [
    {_id: 0, host: "localhost:27017"},
    {_id: 1, host: "localhost:27018"},
    {_id: 2, host: "localhost:27019"}
  ]
});
rs.status();
```

Wait for election. Insert a sample record on the primary:

```javascript
use ReplicationLab
db.Students.insertOne({Student_ID: 1, Name: "Aanya", Course: "BCA"});
```

Connect to a secondary and read replicated data:

```bash
mongosh --port 27018
```

```javascript
rs.secondaryOk();
use ReplicationLab
db.Students.find();
```

## Failure demonstration
Stop the primary process. If a majority of voting members are available, the replica
set can elect a new primary. Applications reconnect using the replica-set connection
string. If a majority is unavailable, the set cannot elect a primary and writes stop.

Use a disposable lab setup; do not stop production database processes.

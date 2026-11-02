// Q10: Run these commands in mongosh connected to mongos,
// AFTER configuring and starting config-server and shard replica sets.
// This script does not configure the servers itself.

sh.enableSharding("ShardingLab");
db = db.getSiblingDB("ShardingLab");

db.Students.drop();
db.createCollection("Students");

// Create 20 sample records
const sample = [];
for (let i = 1; i <= 20; i++) {
  sample.push({
    Student_ID: i,
    Name: "Student" + i,
    Course: i % 2 === 0 ? "BCA" : "BSc IT",
    Marks: 60 + (i % 40)
  });
}
db.Students.insertMany(sample);

// Choose a shard key and shard the collection.
// Student_ID is unique and supports equality/range targeting,
// but a monotonically increasing key can create write hotspots.
sh.shardCollection("ShardingLab.Students", {Student_ID: "hashed"});

// Verify metadata and chunk distribution
printjson(sh.status());
printjson(db.Students.getShardDistribution());

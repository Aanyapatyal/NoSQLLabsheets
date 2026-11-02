// Q9: Single-server/local MongoDB deployment CRUD demonstration
const localDB = db.getSiblingDB("SingleServerLab");
localDB.Students.drop();
localDB.Students.insertMany([
  {Student_ID: 1, Name: "Aanya", Course: "BCA", Marks: 91},
  {Student_ID: 2, Name: "Riya", Course: "BCA", Marks: 86},
  {Student_ID: 3, Name: "Rahul", Course: "BSc IT", Marks: 78}
]);

// Read
printjson(localDB.Students.find().toArray());

// Update
localDB.Students.updateOne({Student_ID: 2}, {$set: {Marks: 90}});

// Delete
localDB.Students.deleteOne({Student_ID: 3});

// Verify
printjson(localDB.Students.find().toArray());
print("Remaining documents: " + localDB.Students.countDocuments());

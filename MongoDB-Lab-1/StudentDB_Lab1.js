// NO SQL & MONGODB LAB SHEET 1
// Database: StudentDB
// Run with: mongosh --file StudentDB_Lab1.js
// WARNING: Q20 drops StudentDB. Use only a practice database.

let studentDB = db.getSiblingDB("StudentDB");

// Q1. Create database and verify
studentDB.createCollection("DatabaseCheck");
print("Q1 - Database created/selected: " + studentDB.getName());

// Q2. Create collections
studentDB.createCollection("Students");
studentDB.createCollection("Faculty");
studentDB.createCollection("Courses");
print("Q2 - Collections:");
printjson(studentDB.getCollectionNames());

// Q3. Insert one student
studentDB.Students.insertOne({
    RollNumber: 101,
    Name: "Aanya",
    Department: "Computer Science",
    Semester: 5,
    CGPA: 9.2
});

// Q4. Insert multiple students
studentDB.Students.insertMany([
    {RollNumber: 102, Name: "Riya", Department: "Computer Science", Semester: 4, CGPA: 8.8},
    {RollNumber: 103, Name: "Rahul", Department: "Civil Engineering", Semester: 3, CGPA: 8.1},
    {RollNumber: 104, Name: "Priya", Department: "IT", Semester: 5, CGPA: 9.0},
    {RollNumber: 105, Name: "Aman", Department: "Mechanical", Semester: 2, CGPA: 7.9}
]);

// Q5. Retrieve all students
print("Q5 - All students:");
printjson(studentDB.Students.find().toArray());

// Q6. Retrieve by Roll Number
print("Q6 - Student with RollNumber 102:");
printjson(studentDB.Students.findOne({RollNumber: 102}));

// Q7. Retrieve by Department
print("Q7 - Computer Science students:");
printjson(studentDB.Students.find({Department: "Computer Science"}).toArray());

// Q8. Field projection
print("Q8 - Names and departments:");
printjson(studentDB.Students.find({}, {_id: 0, Name: 1, Department: 1}).toArray());

// Q9. Update one student's department
studentDB.Students.updateOne(
    {RollNumber: 102},
    {$set: {Department: "Data Science"}}
);

// Q10. Update semester for all students in a department
studentDB.Students.updateMany(
    {Department: "Computer Science"},
    {$set: {Semester: 6}}
);

// Q11. Replace one student document
studentDB.Students.replaceOne(
    {RollNumber: 104},
    {
        RollNumber: 104,
        Name: "Priya Sharma",
        Department: "Information Technology",
        Semester: 6,
        CGPA: 9.3
    }
);

// Q12. Add Email field to all students
studentDB.Students.updateMany(
    {},
    {$set: {Email: "student@example.com"}}
);

// Q13. Remove an existing field from all documents
studentDB.Students.updateMany(
    {},
    {$unset: {Email: ""}}
);

// Q14. Delete one student by Roll Number
studentDB.Students.deleteOne({RollNumber: 105});

// Q15. Delete multiple students matching a condition
studentDB.Students.deleteMany({Department: "Civil Engineering"});

// Q16. Count documents
print("Q16 - Total students:");
print(studentDB.Students.countDocuments());

// Q17. Rename Students collection
studentDB.Students.renameCollection("StudentDetails");
print("Q17 - Collections after rename:");
printjson(studentDB.getCollectionNames());

// Q18. Create Departments and insert sample data
studentDB.createCollection("Departments");
studentDB.Departments.insertMany([
    {DeptID: 1, Department: "Computer Science", HOD: "Mr. Sharma"},
    {DeptID: 2, Department: "IT", HOD: "Mrs. Verma"},
    {DeptID: 3, Department: "Mechanical", HOD: "Mr. Singh"}
]);
print("Q18 - Departments:");
printjson(studentDB.Departments.find().toArray());

// Q19. Drop Departments collection
studentDB.Departments.drop();
print("Q19 - Collections after dropping Departments:");
printjson(studentDB.getCollectionNames());

// Q20. Drop StudentDB database
studentDB.dropDatabase();
print("Q20 - StudentDB database dropped.");

// Q21. Recreate StudentDB and insert sample data
studentDB = db.getSiblingDB("StudentDB");
studentDB.Students.insertMany([
    {RollNumber: 201, Name: "Aanya", Department: "Computer Science", Semester: 5, CGPA: 9.2},
    {RollNumber: 202, Name: "Riya", Department: "IT", Semester: 4, CGPA: 8.8}
]);
print("Q21 - Recreated database data:");
printjson(studentDB.Students.find().toArray());

// Q22. MongoDB Compass CRUD demonstration
// Create: use Add Data > Insert Document.
// Read: view documents in the Documents tab.
// Update: edit a document and click Update.
// Delete: select a document and click Delete.

// Q23. Shell and Compass demonstration
// Shell: run MongoDB commands in mongosh.
// Compass: manage databases and collections through its GUI.

// Q24. MongoDB and SQL comparison
/*
Operation       SQL                         MongoDB
Insert          INSERT INTO ...             insertOne()/insertMany()
Read            SELECT * FROM ...            find()/findOne()
Update          UPDATE ... SET ...           updateOne()/updateMany()
Delete          DELETE FROM ...              deleteOne()/deleteMany()

SQL stores data in tables and rows.
MongoDB stores data in collections and BSON documents.
*/

// Q25. Laboratory report
/*
Objective:
To create and manage a MongoDB database and collections,
and perform CRUD operations using MongoDB Shell and Compass.

Observation:
Database creation, insertion, retrieval, updates, replacement,
deletion, counting, collection renaming and database deletion
are demonstrated through the commands above.

Conclusion:
The basic MongoDB database and CRUD operations were performed.
Add actual execution outputs and screenshots to the lab report.
*/

print("Lab Sheet 1 execution completed.");

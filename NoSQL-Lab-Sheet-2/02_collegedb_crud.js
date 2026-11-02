// Q2: CollegeDB Students CRUD
const collegeDB = db.getSiblingDB("CollegeDB");
collegeDB.Students.drop();

collegeDB.Students.insertMany([
  {Student_ID: 1, Name: "Aanya", Course: "BCA", Semester: 5, Marks: 91},
  {Student_ID: 2, Name: "Riya", Course: "BCA", Semester: 4, Marks: 86},
  {Student_ID: 3, Name: "Rahul", Course: "BSc IT", Semester: 3, Marks: 78},
  {Student_ID: 4, Name: "Priya", Course: "BCA", Semester: 5, Marks: 89},
  {Student_ID: 5, Name: "Aman", Course: "BSc IT", Semester: 2, Marks: 74}
]);

// 1. Display all documents
print("All students:");
printjson(collegeDB.Students.find().toArray());

// 2. Find students from a particular course
print("BCA students:");
printjson(collegeDB.Students.find({Course: "BCA"}).toArray());

// 3. Update marks of a student
collegeDB.Students.updateOne(
  {Student_ID: 3},
  {$set: {Marks: 82}}
);

// 4. Delete one student
collegeDB.Students.deleteOne({Student_ID: 5});

// 5. Count total students
print("Total students: " + collegeDB.Students.countDocuments());

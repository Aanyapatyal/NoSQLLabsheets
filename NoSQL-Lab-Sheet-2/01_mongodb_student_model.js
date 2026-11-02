// Q1: Equivalent student data in MongoDB document model
const studentDB = db.getSiblingDB("StudentDocumentDB");
studentDB.Students.drop();

studentDB.Students.insertMany([
  {Student_ID: 1, Name: "Aanya", Course: "BCA", Semester: 5, Marks: 91.5},
  {Student_ID: 2, Name: "Riya", Course: "BCA", Semester: 4, Marks: 86},
  {Student_ID: 3, Name: "Rahul", Course: "BSc IT", Semester: 3, Marks: 78.5},
  {Student_ID: 4, Name: "Priya", Course: "BCA", Semester: 5, Marks: 89},
  {Student_ID: 5, Name: "Aman", Course: "BSc IT", Semester: 2, Marks: 74}
]);

print("MongoDB student documents:");
printjson(studentDB.Students.find().toArray());

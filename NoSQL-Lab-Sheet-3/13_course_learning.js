// Q13. Course Learning Platform
const db13 = db.getSiblingDB("Lab3_Learning");
db13.Enrollments.drop();

db13.Enrollments.insertMany([
  {
    studentId: 1, studentName: "Aanya",
    course: {courseId: 101, title: "MongoDB", instructor: "Mr. Sharma"},
    modules: [
      {name: "Introduction", completed: true},
      {name: "CRUD", completed: true},
      {name: "Aggregation", completed: true}
    ],
    progress: 100, status: "completed"
  },
  {
    studentId: 2, studentName: "Riya",
    course: {courseId: 101, title: "MongoDB", instructor: "Mr. Sharma"},
    modules: [
      {name: "Introduction", completed: true},
      {name: "CRUD", completed: false},
      {name: "Aggregation", completed: false}
    ],
    progress: 33, status: "in-progress"
  },
  {
    studentId: 3, studentName: "Rahul",
    course: {courseId: 102, title: "Java", instructor: "Mrs. Verma"},
    modules: [
      {name: "Basics", completed: true},
      {name: "OOP", completed: true}
    ],
    progress: 100, status: "completed"
  }
]);

// Students with progress at least 50%
print("Progress >= 50%:");
printjson(db13.Enrollments.find({progress: {$gte: 50}}).toArray());

// Completed courses
print("Completed enrollments:");
printjson(db13.Enrollments.find({status: "completed"}).toArray());

// Students still in progress
print("In-progress enrollments:");
printjson(db13.Enrollments.find({status: "in-progress"}).toArray());

// Course progress summary
print("Average progress by course:");
printjson(db13.Enrollments.aggregate([
  {$group: {
    _id: "$course.title",
    averageProgress: {$avg: "$progress"},
    students: {$sum: 1}
  }}
]).toArray());

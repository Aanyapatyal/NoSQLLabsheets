// Q1. Student Activity Tracking System
const db1 = db.getSiblingDB("Lab3_StudentActivity");
db1.Students.drop();

db1.Students.insertMany([
  {
    studentId: 1, name: "Aanya", department: "BCA",
    courses: ["MongoDB", "Java", "Python"],
    attendance: {percentage: 92, present: 46, total: 50},
    skills: ["SQL", "Java", "MongoDB"],
    recentActivities: [
      {activity: "Completed MongoDB Lab", type: "lab", date: ISODate("2026-10-28")},
      {activity: "Submitted Java Assignment", type: "assignment", date: ISODate("2026-10-29")}
    ]
  },
  {
    studentId: 2, name: "Riya", department: "BCA",
    courses: ["Python", "DBMS"],
    attendance: {percentage: 75, present: 30, total: 40},
    skills: ["Python", "HTML"],
    recentActivities: [
      {activity: "Watched Python Lecture", type: "lecture", date: ISODate("2026-10-27")}
    ]
  },
  {
    studentId: 3, name: "Rahul", department: "BSc IT",
    courses: ["Java", "Networking"],
    attendance: {percentage: 58, present: 29, total: 50},
    skills: ["Java", "Networking"],
    recentActivities: [
      {activity: "Missed Networking Quiz", type: "quiz", date: ISODate("2026-10-26")}
    ]
  }
]);

// Students enrolled in MongoDB
print("Enrolled in MongoDB:");
printjson(db1.Students.find({courses: "MongoDB"}).toArray());

// Attendance below 75%
print("Low attendance:");
printjson(db1.Students.find({"attendance.percentage": {$lt: 75}}).toArray());

// Students with SQL skill
print("Students with SQL skill:");
printjson(db1.Students.find({skills: "SQL"}).toArray());

// Students who completed a lab
print("Students with lab activity:");
printjson(db1.Students.find({"recentActivities.type": "lab"}).toArray());

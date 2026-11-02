// Q14: MongoDB MapReduce (legacy API; availability depends on MongoDB version).
// Newer MongoDB versions may deprecate/remove server-side mapReduce.
// If unavailable, use the aggregation pipeline alternative below.

const mrDB = db.getSiblingDB("MapReduceLab");
mrDB.Students.drop();

mrDB.Students.insertMany([
  {Student_ID: 1, Name: "Aanya", Course: "BCA", Marks: 91},
  {Student_ID: 2, Name: "Riya", Course: "BCA", Marks: 86},
  {Student_ID: 3, Name: "Rahul", Course: "BSc IT", Marks: 78},
  {Student_ID: 4, Name: "Priya", Course: "BCA", Marks: 89},
  {Student_ID: 5, Name: "Aman", Course: "BSc IT", Marks: 74}
]);

// Map: emit course with count and marks sum
const mapFunction = function () {
  emit(this.Course, {count: 1, totalMarks: this.Marks});
};

// Reduce: combine values for each course
const reduceFunction = function (key, values) {
  const result = {count: 0, totalMarks: 0};
  values.forEach(value => {
    result.count += value.count;
    result.totalMarks += value.totalMarks;
  });
  return result;
};

try {
  mrDB.Students.mapReduce(mapFunction, reduceFunction, {out: "CourseSummary"});
  print("MapReduce results:");
  printjson(mrDB.CourseSummary.find().toArray());
} catch (e) {
  print("MapReduce is not supported by this MongoDB version: " + e.message);
}

// Recommended modern equivalent using aggregation:
print("Aggregation alternative (course count and average marks):");
printjson(mrDB.Students.aggregate([
  {$group: {
    _id: "$Course",
    StudentCount: {$sum: 1},
    AverageMarks: {$avg: "$Marks"}
  }}
]).toArray());

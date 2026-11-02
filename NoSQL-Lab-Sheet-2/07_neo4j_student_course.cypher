// Q7: Student-Course relationship graph
// Run in Neo4j Browser or Cypher Shell.

// Clear only these lab labels/relationships before recreating:
MATCH (s:Student) DETACH DELETE s;
MATCH (c:Course) DETACH DELETE c;

// 1. Create at least five students and three courses
CREATE
  (s1:Student {student_id: 1, name: 'Aanya'}),
  (s2:Student {student_id: 2, name: 'Riya'}),
  (s3:Student {student_id: 3, name: 'Rahul'}),
  (s4:Student {student_id: 4, name: 'Priya'}),
  (s5:Student {student_id: 5, name: 'Aman'}),
  (c1:Course {course_id: 'C1', name: 'BCA'}),
  (c2:Course {course_id: 'C2', name: 'BSc IT'}),
  (c3:Course {course_id: 'C3', name: 'MCA'}),
  (s1)-[:ENROLLED_IN]->(c1),
  (s2)-[:ENROLLED_IN]->(c1),
  (s3)-[:ENROLLED_IN]->(c2),
  (s4)-[:ENROLLED_IN]->(c1),
  (s5)-[:ENROLLED_IN]->(c3);

// 2. Display all students
MATCH (s:Student) RETURN s;

// 3. Find students enrolled in a particular course
MATCH (s:Student)-[:ENROLLED_IN]->(c:Course {name: 'BCA'})
RETURN s.name AS Student, c.name AS Course;

// 4. Display all courses taken by a particular student
MATCH (s:Student {name: 'Aanya'})-[:ENROLLED_IN]->(c:Course)
RETURN s.name AS Student, c.name AS Course;

// 5. Add a relationship
MATCH (s:Student {name: 'Rahul'}), (c:Course {name: 'MCA'})
CREATE (s)-[:ENROLLED_IN]->(c);

// Remove a relationship
MATCH (s:Student {name: 'Rahul'})-[r:ENROLLED_IN]->(c:Course {name: 'MCA'})
DELETE r;

// Q11. Student-Course-Department graph
MATCH (n) DETACH DELETE n;

CREATE
  (d1:Department {dept_id: 'D1', name: 'Computer Science'}),
  (d2:Department {dept_id: 'D2', name: 'Information Technology'}),
  (c1:Course {course_id: 'C1', name: 'BCA'}),
  (c2:Course {course_id: 'C2', name: 'BSc IT'}),
  (c3:Course {course_id: 'C3', name: 'MCA'}),
  (s1:Student {student_id: 1, name: 'Aanya'}),
  (s2:Student {student_id: 2, name: 'Riya'}),
  (s3:Student {student_id: 3, name: 'Rahul'}),
  (s4:Student {student_id: 4, name: 'Priya'}),
  (s5:Student {student_id: 5, name: 'Aman'}),
  (c1)-[:OFFERED_BY]->(d1),
  (c2)-[:OFFERED_BY]->(d2),
  (c3)-[:OFFERED_BY]->(d1),
  (s1)-[:ENROLLED_IN]->(c1),
  (s2)-[:ENROLLED_IN]->(c1),
  (s3)-[:ENROLLED_IN]->(c2),
  (s4)-[:ENROLLED_IN]->(c1),
  (s5)-[:ENROLLED_IN]->(c3);

// Display all nodes and relationships for visualization
MATCH (s:Student)-[r:ENROLLED_IN]->(c:Course)-[o:OFFERED_BY]->(d:Department)
RETURN s, r, c, o, d;

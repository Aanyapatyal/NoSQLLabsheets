-- Q11. Cassandra CollegeDB and Students table
CREATE KEYSPACE IF NOT EXISTS CollegeDB
WITH replication = {
  'class': 'SimpleStrategy',
  'replication_factor': 1
};

USE CollegeDB;

DROP TABLE IF EXISTS Students;
CREATE TABLE Students (
  student_id int PRIMARY KEY,
  name text,
  course text,
  semester int,
  marks double
);

INSERT INTO Students (student_id, name, course, semester, marks)
VALUES (1, 'Aanya', 'BCA', 5, 91.5);
INSERT INTO Students (student_id, name, course, semester, marks)
VALUES (2, 'Riya', 'BCA', 4, 86.0);
INSERT INTO Students (student_id, name, course, semester, marks)
VALUES (3, 'Rahul', 'BSc IT', 3, 78.5);
INSERT INTO Students (student_id, name, course, semester, marks)
VALUES (4, 'Priya', 'BCA', 5, 89.0);
INSERT INTO Students (student_id, name, course, semester, marks)
VALUES (5, 'Aman', 'BSc IT', 2, 74.0);

SELECT * FROM Students;

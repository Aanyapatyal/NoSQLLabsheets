-- Q5: Cassandra keyspace and Students table
CREATE KEYSPACE IF NOT EXISTS CollegeDB
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE CollegeDB;

DROP TABLE IF EXISTS Students;
CREATE TABLE Students (
    Student_ID int PRIMARY KEY,
    Name text,
    Course text,
    Semester int,
    Marks double
);

-- Insert five records
INSERT INTO Students (Student_ID, Name, Course, Semester, Marks)
VALUES (1, 'Aanya', 'BCA', 5, 91.5);
INSERT INTO Students (Student_ID, Name, Course, Semester, Marks)
VALUES (2, 'Riya', 'BCA', 4, 86.0);
INSERT INTO Students (Student_ID, Name, Course, Semester, Marks)
VALUES (3, 'Rahul', 'BSc IT', 3, 78.5);
INSERT INTO Students (Student_ID, Name, Course, Semester, Marks)
VALUES (4, 'Priya', 'BCA', 5, 89.0);
INSERT INTO Students (Student_ID, Name, Course, Semester, Marks)
VALUES (5, 'Aman', 'BSc IT', 2, 74.0);

-- Display all records (for a small lab table)
SELECT * FROM Students;

-- Cassandra normally requires indexed/partition-key-friendly queries.
-- For this simple lab demonstration, allow filtering:
SELECT * FROM Students WHERE Course = 'BCA' ALLOW FILTERING;

-- Update marks
UPDATE Students SET Marks = 82.0 WHERE Student_ID = 3;

-- Delete a student
DELETE FROM Students WHERE Student_ID = 5;

SELECT * FROM Students;

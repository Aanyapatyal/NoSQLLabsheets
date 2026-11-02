-- Q1: Create an RDBMS student database and table
CREATE DATABASE IF NOT EXISTS StudentRDBMS;
USE StudentRDBMS;

DROP TABLE IF EXISTS Students;
CREATE TABLE Students (
    Student_ID INT PRIMARY KEY,
    Name VARCHAR(60) NOT NULL,
    Course VARCHAR(40) NOT NULL,
    Semester INT NOT NULL,
    Marks DECIMAL(5,2) NOT NULL
);

-- Insert at least five students
INSERT INTO Students (Student_ID, Name, Course, Semester, Marks) VALUES
(1, 'Aanya', 'BCA', 5, 91.50),
(2, 'Riya', 'BCA', 4, 86.00),
(3, 'Rahul', 'BSc IT', 3, 78.50),
(4, 'Priya', 'BCA', 5, 89.00),
(5, 'Aman', 'BSc IT', 2, 74.00);

SELECT * FROM Students;

-- Comparison notes:
-- RDBMS: fixed table schema, rows and columns, SQL, joins and constraints.
-- Document DB: flexible BSON documents, nested data, collection-based storage.
-- Scalability: both can scale; MongoDB supports horizontal sharding natively.

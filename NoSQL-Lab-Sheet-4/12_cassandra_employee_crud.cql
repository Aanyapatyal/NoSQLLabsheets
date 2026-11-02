-- Q12. Cassandra Employee CRUD
CREATE KEYSPACE IF NOT EXISTS EmployeeLab
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE EmployeeLab;

DROP TABLE IF EXISTS Employees;
CREATE TABLE Employees (
  employee_id int PRIMARY KEY,
  name text,
  department text,
  salary decimal
);

-- INSERT
INSERT INTO Employees (employee_id, name, department, salary)
VALUES (101, 'Aanya', 'IT', 35000);
INSERT INTO Employees (employee_id, name, department, salary)
VALUES (102, 'Riya', 'HR', 30000);

-- SELECT
SELECT * FROM Employees;
SELECT * FROM Employees WHERE employee_id = 101;

-- UPDATE
UPDATE Employees SET salary = 40000 WHERE employee_id = 101;

-- DELETE
DELETE FROM Employees WHERE employee_id = 102;

SELECT * FROM Employees;

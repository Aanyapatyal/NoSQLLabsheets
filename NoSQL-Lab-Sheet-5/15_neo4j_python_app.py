"""
Q15. Small Neo4j application in Python: CRUD + relationship query.

Install:
    pip install -r requirements.txt

Set environment variables:
    NEO4J_URI=bolt://localhost:7687
    NEO4J_USER=neo4j
    NEO4J_PASSWORD=your_password

Run:
    python 15_neo4j_python_app.py
"""
import os
from neo4j import GraphDatabase

URI = os.getenv("NEO4J_URI", "bolt://localhost:7687")
USER = os.getenv("NEO4J_USER", "neo4j")
PASSWORD = os.getenv("NEO4J_PASSWORD", "password")


class StudentGraph:
    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self.driver.close()

    def create_student(self, student_id, name, course):
        query = """
        MERGE (s:Student {student_id: $student_id})
        SET s.name = $name
        MERGE (c:Course {name: $course})
        MERGE (s)-[:ENROLLED_IN]->(c)
        RETURN s.student_id AS id, s.name AS name, c.name AS course
        """
        with self.driver.session() as session:
            return session.execute_write(
                lambda tx: tx.run(
                    query,
                    student_id=student_id,
                    name=name,
                    course=course
                ).single().data()
            )

    def get_student(self, student_id):
        query = """
        MATCH (s:Student {student_id: $student_id})
        OPTIONAL MATCH (s)-[:ENROLLED_IN]->(c:Course)
        RETURN s.student_id AS id, s.name AS name,
               collect(c.name) AS courses
        """
        with self.driver.session() as session:
            record = session.execute_read(
                lambda tx: tx.run(query, student_id=student_id).single()
            )
            return record.data() if record else None

    def update_student(self, student_id, new_name):
        query = """
        MATCH (s:Student {student_id: $student_id})
        SET s.name = $new_name
        RETURN s.student_id AS id, s.name AS name
        """
        with self.driver.session() as session:
            record = session.execute_write(
                lambda tx: tx.run(
                    query,
                    student_id=student_id,
                    new_name=new_name
                ).single()
            )
            return record.data() if record else None

    def delete_student(self, student_id):
        query = """
        MATCH (s:Student {student_id: $student_id})
        DETACH DELETE s
        RETURN count(s) AS deleted
        """
        with self.driver.session() as session:
            return session.execute_write(
                lambda tx: tx.run(query, student_id=student_id).single()["deleted"]
            )

    def find_students_by_course(self, course):
        query = """
        MATCH (s:Student)-[:ENROLLED_IN]->(:Course {name: $course})
        RETURN s.student_id AS id, s.name AS name
        ORDER BY id
        """
        with self.driver.session() as session:
            return session.execute_read(
                lambda tx: [r.data() for r in tx.run(query, course=course)]
            )


def main():
    app = StudentGraph(URI, USER, PASSWORD)
    try:
        print("CREATE:", app.create_student(1, "Aanya", "BCA"))
        print("READ:", app.get_student(1))
        print("UPDATE:", app.update_student(1, "Aanya Patyal"))
        print("RELATIONSHIP QUERY:", app.find_students_by_course("BCA"))
        # Uncomment to demonstrate DELETE:
        # print("DELETE:", app.delete_student(1))
    finally:
        app.close()


if __name__ == "__main__":
    main()

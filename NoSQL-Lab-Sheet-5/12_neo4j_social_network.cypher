// Q12. Social network
MATCH (n) DETACH DELETE n;

CREATE
  (p1:Person {name: 'Aanya'}),
  (p2:Person {name: 'Riya'}),
  (p3:Person {name: 'Rahul'}),
  (p4:Person {name: 'Priya'}),
  (co:Company {name: 'Tech Solutions'}),
  (p1)-[:FRIENDS_WITH]->(p2),
  (p1)-[:FOLLOWS]->(p3),
  (p2)-[:FOLLOWS]->(p1),
  (p3)-[:FRIENDS_WITH]->(p4),
  (p1)-[:WORKS_AT]->(co),
  (p2)-[:WORKS_AT]->(co);

// Find Aanya's friends
MATCH (:Person {name: 'Aanya'})-[:FRIENDS_WITH]-(friend:Person)
RETURN friend.name AS Friend;

// Find people who follow Aanya
MATCH (follower:Person)-[:FOLLOWS]->(:Person {name: 'Aanya'})
RETURN follower.name AS Follower;

// Find people Aanya follows
MATCH (:Person {name: 'Aanya'})-[:FOLLOWS]->(person:Person)
RETURN person.name AS Following;

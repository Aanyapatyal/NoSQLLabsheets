// Q13. E-commerce graph
MATCH (n) DETACH DELETE n;

CREATE
  (customer:Customer {customer_id: 1, name: 'Aanya'}),
  (p1:Product {product_id: 'P101', name: 'Keyboard', price: 800}),
  (p2:Product {product_id: 'P102', name: 'Mouse', price: 400}),
  (p3:Product {product_id: 'P103', name: 'Monitor', price: 7000}),
  (cat1:Category {name: 'Accessories'}),
  (cat2:Category {name: 'Electronics'}),
  (o1:Order {order_id: 5001, date: '2026-10-20'}),
  (customer)-[:PLACED]->(o1),
  (o1)-[:CONTAINS {quantity: 1}]->(p1),
  (o1)-[:CONTAINS {quantity: 2}]->(p2),
  (p1)-[:BELONGS_TO]->(cat1),
  (p2)-[:BELONGS_TO]->(cat1),
  (p3)-[:BELONGS_TO]->(cat2);

// Products purchased by a particular customer
MATCH (:Customer {name: 'Aanya'})-[:PLACED]->(:Order)-[line:CONTAINS]->(p:Product)
RETURN p.name AS Product, line.quantity AS Quantity, p.price AS UnitPrice;

// Customer's order history
MATCH (c:Customer)-[:PLACED]->(o:Order)
RETURN c.name, o.order_id, o.date;

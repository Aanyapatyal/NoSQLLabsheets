// Q14. Neo4j transactions, consistency and availability
// Run the following statements in Neo4j Browser. Each Browser statement is committed
// as a transaction unless explicitly grouped in a driver-managed transaction.

// CREATE sample graph
CREATE (:Account {id: 'A1', owner: 'Aanya', balance: 5000});
CREATE (:Account {id: 'A2', owner: 'Riya', balance: 2000});

// Transaction-like multi-step transfer in one Cypher query.
// The query checks the sender balance, updates both accounts in one database transaction.
MATCH (a:Account {id: 'A1'}), (b:Account {id: 'A2'})
WHERE a.balance >= 1000
SET a.balance = a.balance - 1000,
    b.balance = b.balance + 1000
RETURN a, b;

// MATCH and SET example
MATCH (a:Account {id: 'A1'})
SET a.status = 'active'
RETURN a;

// DELETE example
MATCH (a:Account {id: 'A2'})
SET a.note = 'Transfer received'
RETURN a;

// Verify balances
MATCH (a:Account) RETURN a;

// Delete lab data after demonstration if desired
// MATCH (a:Account) DETACH DELETE a;

// Explanation:
// Neo4j transactions are ACID. A transaction commits all its writes or rolls them back.
// In a cluster, availability depends on topology, quorum/leader availability and routing.
// Enterprise clustering features and configuration depend on the Neo4j edition/version.

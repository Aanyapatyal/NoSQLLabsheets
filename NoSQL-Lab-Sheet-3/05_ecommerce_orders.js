// Q5. E-Commerce Order Management
const db5 = db.getSiblingDB("Lab3_ECommerce");
db5.Customers.drop();
db5.Products.drop();
db5.Orders.drop();

db5.Customers.insertMany([
  {_id: 1, name: "Aanya", email: "aanya@example.com"},
  {_id: 2, name: "Riya", email: "riya@example.com"}
]);

db5.Products.insertMany([
  {_id: 101, name: "Keyboard", price: 800},
  {_id: 102, name: "Mouse", price: 400},
  {_id: 103, name: "Monitor", price: 7000}
]);

db5.Orders.insertMany([
  {
    orderId: 5001, customerId: 1, orderDate: ISODate("2026-10-20"),
    items: [{productId: 101, name: "Keyboard", price: 800, quantity: 1},
            {productId: 102, name: "Mouse", price: 400, quantity: 2}]
  },
  {
    orderId: 5002, customerId: 1, orderDate: ISODate("2026-10-25"),
    items: [{productId: 103, name: "Monitor", price: 7000, quantity: 1}]
  },
  {
    orderId: 5003, customerId: 2, orderDate: ISODate("2026-10-26"),
    items: [{productId: 102, name: "Mouse", price: 400, quantity: 1}]
  }
]);

// Complete purchase history for customer 1, including calculated total
print("Aanya's purchase history:");
printjson(db5.Orders.aggregate([
  {$match: {customerId: 1}},
  {$addFields: {
    total: {$sum: {$map: {
      input: "$items",
      as: "item",
      in: {$multiply: ["$$item.price", "$$item.quantity"]}
    }}}
  }},
  {$sort: {orderDate: -1}}
]).toArray());

// Total amount spent by each customer
print("Customer totals:");
printjson(db5.Orders.aggregate([
  {$unwind: "$items"},
  {$group: {
    _id: "$customerId",
    totalSpent: {$sum: {$multiply: ["$items.price", "$items.quantity"]}}
  }}
]).toArray());

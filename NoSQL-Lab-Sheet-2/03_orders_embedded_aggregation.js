// Q3: Orders with embedded customer and product documents
const orderDB = db.getSiblingDB("OrderDB");
orderDB.Orders.drop();

orderDB.Orders.insertMany([
  {
    Order_ID: 1001,
    Customer: {Customer_ID: 1, Name: "Aanya"},
    Products: [
      {Product: "Keyboard", Price: 800, Quantity: 1},
      {Product: "Mouse", Price: 400, Quantity: 2}
    ]
  },
  {
    Order_ID: 1002,
    Customer: {Customer_ID: 2, Name: "Riya"},
    Products: [
      {Product: "Monitor", Price: 7000, Quantity: 1},
      {Product: "Cable", Price: 250, Quantity: 2}
    ]
  },
  {
    Order_ID: 1003,
    Customer: {Customer_ID: 1, Name: "Aanya"},
    Products: [
      {Product: "USB Drive", Price: 600, Quantity: 2}
    ]
  },
  {
    Order_ID: 1004,
    Customer: {Customer_ID: 3, Name: "Rahul"},
    Products: [
      {Product: "Laptop Stand", Price: 1200, Quantity: 1},
      {Product: "Mouse", Price: 400, Quantity: 1}
    ]
  },
  {
    Order_ID: 1005,
    Customer: {Customer_ID: 4, Name: "Priya"},
    Products: [
      {Product: "Headphones", Price: 1500, Quantity: 1}
    ]
  }
]);

// 1. Display all orders
print("All orders:");
printjson(orderDB.Orders.find().toArray());

// 2. Orders of a particular customer
print("Orders by Aanya:");
printjson(orderDB.Orders.find({"Customer.Name": "Aanya"}).toArray());

// 3. Update quantity of a product in one order
orderDB.Orders.updateOne(
  {Order_ID: 1001, "Products.Product": "Mouse"},
  {$set: {"Products.$.Quantity": 3}}
);

// 4. Calculate each order amount using aggregation
print("Order totals:");
printjson(orderDB.Orders.aggregate([
  {$unwind: "$Products"},
  {$group: {
    _id: "$Order_ID",
    Customer: {$first: "$Customer.Name"},
    TotalAmount: {$sum: {$multiply: ["$Products.Price", "$Products.Quantity"]}}
  }},
  {$sort: {_id: 1}}
]).toArray());

// 5. Display orders above a specified amount (example: 1000)
print("Orders above 1000:");
printjson(orderDB.Orders.aggregate([
  {$unwind: "$Products"},
  {$group: {
    _id: "$Order_ID",
    Customer: {$first: "$Customer.Name"},
    TotalAmount: {$sum: {$multiply: ["$Products.Price", "$Products.Quantity"]}}
  }},
  {$match: {TotalAmount: {$gt: 1000}}},
  {$sort: {TotalAmount: -1}}
]).toArray());

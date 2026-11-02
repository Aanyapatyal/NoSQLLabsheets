// Q14. Real-Time Order Tracking System
const db14 = db.getSiblingDB("Lab3_OrderTracking");
db14.Orders.drop();

db14.Orders.insertOne({
  orderId: 7001,
  customer: "Aanya",
  currentStatus: "Placed",
  statusHistory: [
    {status: "Placed", time: ISODate("2026-10-30T09:00:00Z")}
  ]
});

// Move to Confirmed
db14.Orders.updateOne(
  {orderId: 7001},
  {
    $set: {currentStatus: "Confirmed"},
    $push: {statusHistory: {status: "Confirmed", time: new Date()}}
  }
);

// Move to Shipped
db14.Orders.updateOne(
  {orderId: 7001},
  {
    $set: {currentStatus: "Shipped"},
    $push: {statusHistory: {status: "Shipped", time: new Date()}}
  }
);

// Move to Delivered
db14.Orders.updateOne(
  {orderId: 7001},
  {
    $set: {currentStatus: "Delivered"},
    $push: {statusHistory: {status: "Delivered", time: new Date()}}
  }
);

// Retrieve current status
print("Current order status:");
printjson(db14.Orders.findOne(
  {orderId: 7001},
  {_id: 0, orderId: 1, currentStatus: 1}
));

// Retrieve complete status history
print("Complete order history:");
printjson(db14.Orders.findOne(
  {orderId: 7001},
  {_id: 0, statusHistory: 1}
));

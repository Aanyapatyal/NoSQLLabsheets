// Q8. Shopping Cart using embedded documents
const db8 = db.getSiblingDB("Lab3_ShoppingCart");
db8.Carts.drop();

db8.Carts.insertOne({
  userId: 1,
  customer: "Aanya",
  items: [
    {productId: 101, name: "Keyboard", price: 800, quantity: 1},
    {productId: 102, name: "Mouse", price: 400, quantity: 2}
  ]
});

// Add a product
db8.Carts.updateOne(
  {userId: 1},
  {$push: {items: {productId: 103, name: "USB Drive", price: 600, quantity: 1}}}
);

// Change quantity of a product
db8.Carts.updateOne(
  {userId: 1, "items.productId": 102},
  {$set: {"items.$.quantity": 3}}
);

// Remove a product
db8.Carts.updateOne(
  {userId: 1},
  {$pull: {items: {productId: 103}}}
);

// Calculate cart value
print("Cart and total:");
printjson(db8.Carts.aggregate([
  {$match: {userId: 1}},
  {$addFields: {
    cartTotal: {$sum: {$map: {
      input: "$items",
      as: "item",
      in: {$multiply: ["$$item.price", "$$item.quantity"]}
    }}}
  }}
]).toArray());

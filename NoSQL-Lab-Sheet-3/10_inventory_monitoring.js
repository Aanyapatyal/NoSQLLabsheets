// Q10. Inventory Monitoring System
const db10 = db.getSiblingDB("Lab3_Inventory");
db10.Products.drop();

db10.Products.insertMany([
  {productId: 1, name: "Keyboard", stock: 5, minStock: 10, supplier: "ABC Traders", restockDate: ISODate("2026-11-05")},
  {productId: 2, name: "Mouse", stock: 25, minStock: 10, supplier: "Tech Supply", restockDate: ISODate("2026-11-10")},
  {productId: 3, name: "Monitor", stock: 2, minStock: 5, supplier: "Screen World", restockDate: ISODate("2026-11-03")},
  {productId: 4, name: "USB Drive", stock: 8, minStock: 8, supplier: "ABC Traders", restockDate: ISODate("2026-11-04")}
]);

// Products at or below minimum stock need restocking
print("Products needing immediate restocking:");
printjson(db10.Products.find({
  $expr: {$lte: ["$stock", "$minStock"]}
}).toArray());

// Sort by lowest stock first
print("Restocking priority:");
printjson(db10.Products.find({
  $expr: {$lte: ["$stock", "$minStock"]}
}).sort({stock: 1}).toArray());

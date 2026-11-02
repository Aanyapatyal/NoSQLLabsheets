// Q4. Flexible Product Catalog
const db4 = db.getSiblingDB("Lab3_ProductCatalog");
db4.Products.drop();

db4.Products.insertMany([
  {
    name: "Laptop Pro", category: "laptop", price: 75000,
    attributes: {ramGB: 16, storageGB: 512, processor: "Intel i7"}
  },
  {
    name: "Laptop Air", category: "laptop", price: 62000,
    attributes: {ramGB: 8, storageGB: 512, processor: "Intel i5"}
  },
  {
    name: "Phone X", category: "mobile", price: 35000,
    attributes: {ramGB: 8, storageGB: 256, cameraMP: 50, batteryMah: 5000}
  },
  {
    name: "Phone Mini", category: "mobile", price: 22000,
    attributes: {ramGB: 6, storageGB: 128, cameraMP: 32, batteryMah: 4500}
  },
  {
    name: "Camera Z", category: "camera", price: 58000,
    attributes: {megapixels: 24, sensor: "APS-C", lensMount: "X"}
  }
]);

// Laptops with at least 16 GB RAM
print("Laptops with 16GB+ RAM:");
printjson(db4.Products.find({
  category: "laptop", "attributes.ramGB": {$gte: 16}
}).toArray());

// Mobiles with 50 MP camera
print("Mobiles with 50MP camera:");
printjson(db4.Products.find({
  category: "mobile", "attributes.cameraMP": {$gte: 50}
}).toArray());

// Cameras with APS-C sensor
print("APS-C cameras:");
printjson(db4.Products.find({
  category: "camera", "attributes.sensor": "APS-C"
}).toArray());

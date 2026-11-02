// Q9. Product Review and Rating System
const db9 = db.getSiblingDB("Lab3_ProductReviews");
db9.Reviews.drop();

db9.Reviews.insertMany([
  {productId: 101, productName: "Keyboard", customer: "Aanya", rating: 5, review: "Excellent"},
  {productId: 101, productName: "Keyboard", customer: "Riya", rating: 4, review: "Good"},
  {productId: 102, productName: "Mouse", customer: "Rahul", rating: 3, review: "Average"},
  {productId: 102, productName: "Mouse", customer: "Priya", rating: 4, review: "Good"},
  {productId: 102, productName: "Mouse", customer: "Aman", rating: 5, review: "Great"}
]);

print("Average rating and review count:");
printjson(db9.Reviews.aggregate([
  {$group: {
    _id: "$productId",
    productName: {$first: "$productName"},
    averageRating: {$avg: "$rating"},
    reviewCount: {$sum: 1}
  }},
  {$sort: {_id: 1}}
]).toArray());

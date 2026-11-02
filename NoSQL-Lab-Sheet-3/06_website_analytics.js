// Q6. Website Analytics
const db6 = db.getSiblingDB("Lab3_WebAnalytics");
db6.PageVisits.drop();

db6.PageVisits.insertMany([
  {page: "/home", userId: 1, device: "mobile", browser: "Chrome", location: "India", time: ISODate("2026-10-30T09:00:00Z")},
  {page: "/home", userId: 2, device: "desktop", browser: "Firefox", location: "India", time: ISODate("2026-10-30T09:05:00Z")},
  {page: "/products", userId: 1, device: "mobile", browser: "Chrome", location: "India", time: ISODate("2026-10-30T09:10:00Z")},
  {page: "/home", userId: 3, device: "tablet", browser: "Safari", location: "UK", time: ISODate("2026-10-30T09:15:00Z")},
  {page: "/products", userId: 4, device: "mobile", browser: "Chrome", location: "India", time: ISODate("2026-10-30T09:20:00Z")},
  {page: "/contact", userId: 2, device: "desktop", browser: "Firefox", location: "India", time: ISODate("2026-10-30T09:25:00Z")}
]);

// Most visited pages
print("Most visited pages:");
printjson(db6.PageVisits.aggregate([
  {$group: {_id: "$page", visits: {$sum: 1}}},
  {$sort: {visits: -1}}
]).toArray());

// Commonly used devices
print("Device usage:");
printjson(db6.PageVisits.aggregate([
  {$group: {_id: "$device", visits: {$sum: 1}}},
  {$sort: {visits: -1}}
]).toArray());

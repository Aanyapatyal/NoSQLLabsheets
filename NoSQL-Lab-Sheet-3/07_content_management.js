// Q7. Content Management System
const db7 = db.getSiblingDB("Lab3_CMS");
db7.Articles.drop();

db7.Articles.insertMany([
  {title: "MongoDB Guide", author: "Aanya", category: "Technology", tags: ["MongoDB", "NoSQL"], status: "published", publishedAt: ISODate("2026-10-20")},
  {title: "Java Notes", author: "Riya", category: "Education", tags: ["Java"], status: "published", publishedAt: ISODate("2026-10-22")},
  {title: "Draft: Python Tips", author: "Rahul", category: "Technology", tags: ["Python"], status: "draft"},
  {title: "Study Skills", author: "Priya", category: "Education", tags: ["Study"], status: "unpublished"}
]);

// Published content
print("Published articles:");
printjson(db7.Articles.find({status: "published"}).toArray());

// Unpublished/draft content
print("Unpublished articles:");
printjson(db7.Articles.find({status: {$in: ["draft", "unpublished"]}}).toArray());

// Published Technology articles
print("Published Technology articles:");
printjson(db7.Articles.find({
  status: "published", category: "Technology"
}).toArray());

// Articles by tag
print("Articles tagged Java:");
printjson(db7.Articles.find({tags: "Java"}).toArray());

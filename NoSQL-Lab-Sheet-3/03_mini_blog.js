// Q3. Mini Blogging Platform
const db3 = db.getSiblingDB("Lab3_Blogging");
db3.Blogs.drop();

db3.Blogs.insertMany([
  {
    title: "Learning MongoDB", author: {name: "Aanya", id: 1},
    category: "Technology", tags: ["MongoDB", "NoSQL", "Database"],
    comments: [{user: "Riya", text: "Helpful article"}],
    published: true, publishedAt: ISODate("2026-10-20")
  },
  {
    title: "Java Basics", author: {name: "Riya", id: 2},
    category: "Programming", tags: ["Java", "Coding"],
    comments: [{user: "Aman", text: "Nice explanation"}],
    published: true, publishedAt: ISODate("2026-10-21")
  },
  {
    title: "NoSQL Models", author: {name: "Rahul", id: 3},
    category: "Technology", tags: ["NoSQL", "Database"],
    comments: [], published: false
  },
  {
    title: "Study Planning", author: {name: "Priya", id: 4},
    category: "Education", tags: ["Study", "Planning"],
    comments: [], published: true, publishedAt: ISODate("2026-10-22")
  }
]);

// Category match
print("Technology blogs:");
printjson(db3.Blogs.find({category: "Technology"}).toArray());

// Blogs containing a specific tag
print("NoSQL blogs:");
printjson(db3.Blogs.find({tags: "NoSQL"}).toArray());

// Both category and tag
print("Technology + Database:");
printjson(db3.Blogs.find({category: "Technology", tags: "Database"}).toArray());

// Match any of multiple tags
print("Java or MongoDB blogs:");
printjson(db3.Blogs.find({tags: {$in: ["Java", "MongoDB"]}}).toArray());

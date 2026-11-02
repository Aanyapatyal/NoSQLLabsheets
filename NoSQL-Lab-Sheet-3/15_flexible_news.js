// Q15. Flexible News Database
const db15 = db.getSiblingDB("Lab3_News");
db15.Articles.drop();

db15.Articles.insertMany([
  {
    title: "Technology Summit Announced",
    author: "Aanya",
    location: "Delhi",
    category: "Technology",
    tags: ["AI", "Technology"],
    images: ["summit.jpg"],
    sources: ["News Desk"],
    publishedAt: ISODate("2026-10-20")
  },
  {
    title: "Heavy Rainfall in North India",
    location: "Uttarakhand",
    category: "Weather",
    tags: ["Rain", "Weather"],
    sources: ["Weather Bureau"],
    publishedAt: ISODate("2026-10-21")
  },
  {
    title: "Local Education Initiative",
    author: {name: "Riya", organization: "Education Desk"},
    category: "Education",
    tags: ["Schools", "Community"],
    publishedAt: ISODate("2026-10-22"),
    featured: true
  },
  {
    title: "New Camera Launch",
    author: "Rahul",
    category: "Technology",
    images: ["camera.png", "camera-detail.png"],
    sources: [{name: "Tech Review", url: "https://example.com"}]
  }
]);

// Search by category, even when other fields vary
print("Technology articles:");
printjson(db15.Articles.find({category: "Technology"}).toArray());

// Search by tag
print("Articles tagged Weather:");
printjson(db15.Articles.find({tags: "Weather"}).toArray());

// Search by location
print("Articles from Uttarakhand:");
printjson(db15.Articles.find({location: "Uttarakhand"}).toArray());

// Find documents where author exists, regardless of author value type
print("Articles with author field:");
printjson(db15.Articles.find({author: {$exists: true}}).toArray());

// Find articles with images
print("Articles containing images:");
printjson(db15.Articles.find({images: {$exists: true, $ne: []}}).toArray());

// Search using multiple optional fields
print("Technology articles tagged AI:");
printjson(db15.Articles.find({
  category: "Technology",
  tags: "AI"
}).toArray());

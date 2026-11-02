// Q12. User Notification System
const db12 = db.getSiblingDB("Lab3_Notifications");
db12.Notifications.drop();

db12.Notifications.insertMany([
  {userId: 1, type: "message", text: "You have a new message", read: false, createdAt: new Date()},
  {userId: 1, type: "order-update", text: "Your order has shipped", read: false, createdAt: new Date()},
  {userId: 1, type: "system-alert", text: "Password updated", read: true, createdAt: new Date()},
  {userId: 2, type: "message", text: "Welcome", read: false, createdAt: new Date()}
]);

// Retrieve unread notifications for user 1
print("Unread notifications:");
printjson(db12.Notifications.find({userId: 1, read: false}).toArray());

// Mark one notification as read
db12.Notifications.updateOne(
  {userId: 1, type: "message", read: false},
  {$set: {read: true, readAt: new Date()}}
);

// Mark all remaining notifications as read
db12.Notifications.updateMany(
  {userId: 1, read: false},
  {$set: {read: true, readAt: new Date()}}
);

print("Notifications after update:");
printjson(db12.Notifications.find({userId: 1}).toArray());

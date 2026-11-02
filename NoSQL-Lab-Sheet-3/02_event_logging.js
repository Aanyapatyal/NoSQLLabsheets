// Q2. Event Logging System
const db2 = db.getSiblingDB("Lab3_EventLogs");
db2.Events.drop();

db2.Events.insertMany([
  {user: "aanya", event: "login", time: ISODate("2026-10-30T09:00:00Z"), ip: "192.0.2.1"},
  {user: "aanya", event: "failed-login", time: ISODate("2026-10-30T09:05:00Z"), ip: "192.0.2.1"},
  {user: "aanya", event: "failed-login", time: ISODate("2026-10-30T09:06:00Z"), ip: "192.0.2.1"},
  {user: "aanya", event: "failed-login", time: ISODate("2026-10-30T09:07:00Z"), ip: "192.0.2.1"},
  {user: "riya", event: "file-upload", time: ISODate("2026-10-30T10:00:00Z"), file: "notes.pdf"},
  {user: "riya", event: "password-change", time: ISODate("2026-10-30T10:15:00Z")},
  {user: "rahul", event: "logout", time: ISODate("2026-10-30T11:00:00Z")},
  {user: "aanya", event: "login", time: ISODate("2026-10-30T11:30:00Z")}
]);

// Repeated failed-login attempts: users with at least 2 failures
print("Repeated failed logins:");
printjson(db2.Events.aggregate([
  {$match: {event: "failed-login"}},
  {$group: {_id: "$user", failedAttempts: {$sum: 1}}},
  {$match: {failedAttempts: {$gte: 2}}}
]).toArray());

// Frequently occurring event types
print("Event frequency:");
printjson(db2.Events.aggregate([
  {$group: {_id: "$event", count: {$sum: 1}}},
  {$sort: {count: -1}}
]).toArray());

// All events for a user
print("Aanya's events:");
printjson(db2.Events.find({user: "aanya"}).sort({time: 1}).toArray());

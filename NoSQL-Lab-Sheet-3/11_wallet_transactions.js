// Q11. Bank Wallet Transfer using MongoDB transactions
// REQUIREMENT: MongoDB must run as a replica set or sharded cluster.
// A standalone MongoDB server cannot run this multi-document transaction.

const walletDB = db.getSiblingDB("Lab3_Wallet");
walletDB.Users.deleteMany({});
walletDB.Users.insertMany([
  {_id: 1, name: "Aanya", balance: 5000},
  {_id: 2, name: "Riya", balance: 2000}
]);

const session = db.getMongo().startSession();
const sessionDB = session.getDatabase("Lab3_Wallet");
const senderId = 1;
const receiverId = 2;
const amount = 1000;

try {
  session.withTransaction(() => {
    const sender = sessionDB.Users.updateOne(
      {_id: senderId, balance: {$gte: amount}},
      {$inc: {balance: -amount}}
    );

    if (sender.modifiedCount !== 1) {
      throw new Error("Sender not found or insufficient balance");
    }

    const receiver = sessionDB.Users.updateOne(
      {_id: receiverId},
      {$inc: {balance: amount}}
    );

    if (receiver.modifiedCount !== 1) {
      throw new Error("Receiver not found");
    }
  });

  print("Transfer completed successfully.");
} catch (error) {
  print("Transfer failed: " + error.message);
} finally {
  session.endSession();
}

print("Wallet balances:");
printjson(walletDB.Users.find().toArray());

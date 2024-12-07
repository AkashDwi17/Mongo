const mongoose = require("mongoose");
const Chat = require("./models/chat.js");  // Ensure consistent naming with 'Chat'

main()
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => console.log("Connection error:", err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  let allChats = [
    {
      from: "Neha",
      to: "Priti",
      msg: "Send me your exam sheets.",
      created_at: new Date(),
    },
    {
      from: "Rohit",
      to: "Mohit",
      msg: "Send me JS callbacks",
      created_at: new Date(),
    },
    {
      from: "Amit",
      to: "Sumit",
      msg: "All the best!",
      created_at: new Date(),
    },
    {
      from: "Anita",
      to: "Ramesh",
      msg: "Bring me some fruits",
      created_at: new Date(),
    },
    {
      from: "Tony",
      to: "Peter",
      msg: "Love you 3000.",
      created_at: new Date(),
    }
  ];

  await Chat.insertMany(allChats)  // Use 'Chat' for consistency
    .then((res) => {
      console.log("All chats inserted:", res);
    })
    .catch((err) => {
      console.log("Error inserting chats:", err);
    });
}

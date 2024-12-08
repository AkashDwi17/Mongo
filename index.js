const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const chat = require("./models/chat");           //////////

const methodOverride = require("method-override")

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));



main()
  .then(() => {
    console.log("Connection successful");
  })
  .catch(err => console.log("Database connection error:", err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// index route
app.get("/chats", async (req, res) => {
   
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs", { chats });
 
});

//New route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

//create route
// const chat = require("./models/chat"); // Ensure the chat model is imported correctly

app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;
  
  let newChat = new chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });

  newChat
    .save()
    .then(() => {
      console.log("Chat was saved");
      res.redirect("/chats"); // Redirect after saving successfully
    })
    .catch((err) => {
      console.error("Error saving chat:", err);
      res.status(500).send("Error saving chat");
    });
});


// Edit Route
app.get("/chats/:id/edit", async (req, res) => {
  let {id} = req.params;                          // jab then na use karna ho to await
  let chat = await Chat.findById(id);            // ka use kar lenge and function ko 
  res.render("edit.ejs",{chat});                     // asyns bana denge
});

// update route
app.put("/chats/:id", async(req, res) => {
  let {id} = req.params;
  let {msg:newMsg} = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    {msg : newMsg},
    {runValidators: true, new: true}
  );
  res.redirect("/chats");
});

// Destroy route

app.delete("/chats/:id", async(req, res) => {
  let {id} = req.params;


  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log (deletedChat);
  res.redirect("/chats");
});

app.get("/", (req, res) => {
  res.send("Root is working");
});

app.listen(3000, () => {
  console.log("Server is listining on port 3000");
});



let allChats = new Chat({
  from: "Neha",
  to: "Priya",
  msg: "Send me your exam sheets.",
  created_at: new Date(),
});

allChats.save()
  .then((res) => {
    console.log(res);
  });

const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    msg: {
        type: String,
        maxLength: 50
    },
    created_at: {
        type: Date,
        default: Date.now,  // Automatically set to current date  //////// new line
        required: true
    }
});

// create model

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;

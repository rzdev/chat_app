const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  roomId: String,
  username: String,
  message: String,
  createdAt: Date,
});

const Message = mongoose.model("Message", schema);

module.exports = Message;

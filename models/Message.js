const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Message Schema
const MessageSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  sender_id: {
    type: String,
    required: true
  },
  receiver_id: {
    type: String,
    required: true
  },
  timestamp : {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('message', MessageSchema);
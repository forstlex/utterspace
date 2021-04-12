const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  renttype: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  userid: {
    type: String,
    required: true
  },
  images: {
    type: Array
  }
});

module.exports = mongoose.model("spaces", UserSchema);
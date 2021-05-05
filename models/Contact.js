const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Contact Schema
const ContactSchema = new Schema({
  seller_id: {
    type: String,
    required: true
  },
  buyer_id: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('contact', ContactSchema);
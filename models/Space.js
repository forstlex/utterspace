const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Space Schema
const SpaceSchema = new Schema({
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
    type: Array,
    required: true
  },
  available: {
    type: Boolean,
  },
  geo: {
    type: Object,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  expiredate: {
    type: String,
  }
});

module.exports = mongoose.model("spaces", SpaceSchema);
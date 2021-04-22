const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Space Schema
const BookingSchema = new Schema({
  sid: {
    type: String,
    required: true
  },
  buyerid: {
    type: String,
    required: true
  },
  sellerid: {
    type: String,
    required: true
  },
  startdate: {
    type: String,
    required: true
  },
  enddate: {
    type: String,
    required: true
  },
  images: {
    type: Array,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('booking', BookingSchema);
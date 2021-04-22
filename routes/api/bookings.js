const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

// Load Booking model
const Booking = require("../../models/Booking");
const Space = require("../../models/Space");

router.post(
  "/",
  check('sid', 'Space id is required').notEmpty(),
  check('sellerid', 'Seller Id is required').notEmpty(),
  check('buyerid', 'Buyer Id is required').notEmpty(),
  check('location', 'Space Location is required').notEmpty(),
  check('images', 'Space images are required').notEmpty(),
  check('startdate', 'Start Date is required').notEmpty(),
  check('enddate', 'End Date is required').notEmpty(),
  check('price', 'Start Date is required').notEmpty(),
  auth,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newBooking = new Booking({
      sid: req.body.sid,
      sellerid: req.body.sellerid,
      buyerid: req.body.buyerid,
      location: req.body.location,
      images: req.body.images,
      startdate: req.body.startdate,
      enddate: req.body.enddate,
      price: req.body.price
    });

    newBooking.save()
      .then(booking => {
        Space.updateOne({ _id: req.body.sid }, { $set: { available: false, expiredate: req.body.enddate }})
          .then(res.status(200).json({ booking }))
          .catch(error => console.log('Update space booked error:', error))
      })
      .catch(err => {
        console.log('Booking save error:', err) 
        res.status(400).send("unable to save to database");
      });
  }
);

module.exports = router;
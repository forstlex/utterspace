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
  check('uid', 'User id is required').notEmpty(),
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
      uid: req.body.uid,
      startdate: req.body.startdate,
      enddate: req.body.enddate,
      price: req.body.price
    });

    newBooking.save()
      .then(booking => {
        Space.updateOne({ _id: req.body.sid }, { $set: { available: false }})
          .then(res.status(200).json({ booking }))
          .catch(error => console.log('Delete booked space error:', error))
      })
      .catch(err => {
        console.log('Booking save error:', err) 
        res.status(400).send("unable to save to database");
      });
  }
);

module.exports = router;
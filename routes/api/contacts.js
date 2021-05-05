const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

// Load Contact model
const Contact = require("../../models/Contact");

router.post(
  "/",
  check('sellerid', 'Seller Id is required').notEmpty(),
  check('buyerid', 'Buyer Id is required').notEmpty(),
  auth,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newContact = new Contact({
      seller_id: req.body.sellerid,
      buyer_id: req.body.buyerid
    });

    newContact.save()
      .then(Contact => {
        res.status(200).json({ contact });
      })
      .catch(err => {
        res.status(400).json({ err });
      });
  }
);

router.get(
  "/:id",
  auth,
  async (req, res) => {
    try {
      const contacts = await Contact.find({ buyer_id: req.params.id });
      res.status(200).json({ all: contacts });
    } catch (err) {
      res.status(400).json({ all : [] });
    }
  }
);

module.exports = router;
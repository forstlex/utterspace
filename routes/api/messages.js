const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

const Message = require("../../models/Message");

router.post(
  "/",
  check('message', 'Message is required').notEmpty(),
  check('sender_id', 'Sender ID is required').notEmpty(),
  check('receiver_id', 'Receiver ID is required').notEmpty(),
  auth,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newMessage = new Message({
      text: req.body.message,
      sender_id: req.body.sender_id,
      receiver_id: req.body.receiver_id,
      timestamp: req.body.timestamp
    });

    newMessage.save()
      .then(message => {
        res.status(200).json({ message });
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
      const allMessages = await Message.find({ $or: [{ sender_id: req.params.id }, { receiver_id: req.params.id }] }).sort({ timestamp: 1 });
      res.status(200).json({ messages: allMessages });
    } catch (err) {
      res.status(400).json({ messages: [] });
    }
  }

)

module.exports = router;
const express = require("express");
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const router = express.Router();
const mongoose = require('mongoose');
const haversine = require('haversine-distance')

const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

// Load Space model
const Space = require("../../models/Space");

// @route POST api/users/register
// @desc Register user
// @access Public

const DIR = './uploads/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

// @route GET api/spaces/all
// @desc Guest Spaces
// @access Public
router.get("/all", async (req, res) => {

  let allSpaces = [];
  try {
    allSpaces = await Space.find({});
    res.status(200).json({ allSpaces });
  } catch (err) {
    console.error(err)
    res.status(400).send('Unable to get spaces');
  }
});

router.post('/upload-images', upload.array('images', 2), (req, res, next) => {
  const files = req.files.map(file => file.path);
  res.status(201).json({ files: req.files.map(file => file.path) });
});

router.get("/near", async (req, res) => {
  const pointA = { lat: parseFloat(req.query.lat), lng: parseFloat(req.query.lng) };
  // const pointA = { lat: 43.225, lng: -79.68 } TESTING CODE
  const allSpaces = await Space.find({ });
  const nearSpaces = allSpaces.filter(s => {
    // Find Spaces near in 50 km
    if(haversine(pointA, s.geo) < 50000) {
      return true
    }
    return false;
  });
  return res.status(200).json({ nearSpaces });
})

router.post(
  "/",
  check('rentType', 'Rent type is required').notEmpty(),
  check('description', 'Description is required').notEmpty(),
  check('location', 'Location is required').notEmpty(),
  check('price', 'Price is required').notEmpty(),
  check('userid', 'User id is required').notEmpty(),
  check('images', 'Image is required').notEmpty(),
  check('geo', 'Geolocation is required').notEmpty(),
  auth,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newSpace = new Space({
      renttype: req.body.rentType,
      description: req.body.description,
      location: req.body.location,
      price: req.body.price,
      userid: req.body.userid,
      images: req.body.images,
      geo: req.body.geo,
      available: true
    });

    newSpace.save()
      .then(space => {
        res.json({ space })
      })
      .catch(err => console.log(err));
  }
);

router.delete("/:id", auth, async(req, res) => {
  const response = await Space.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) });
  if (response.deletedCount === 1) {
    res.status(200).json({ delete: true });
  } else {
    res.status(403).json({ delete: false })
  }
});

router.get("/:id", auth, async (req, res) => {
  const allSpaces = await Space.find({ available: true });
  const buySpaces = allSpaces.filter(s => s.userid != req.params.id);
  const userSpaces = await Space.find({ $and: [{ userid: req.params.id }, { available: true }]});
  return res.status(200).json({ allSpaces, userSpaces, buySpaces });
});

module.exports = router;
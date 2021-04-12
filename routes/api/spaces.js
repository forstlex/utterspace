const express = require("express");
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth')
// Load Space model
const Space = require("../../models/Space");

// @route POST api/users/register
// @desc Register user
// @access Public

router.post(
  "/",
  check('rentType', 'Rent type is required').notEmpty(),
  check('description', 'Description is required').notEmpty(),
  check('location', 'Location is required').notEmpty(),
  check('price', 'Price is required').notEmpty(),
  check('userid', 'User id is required').notEmpty(),
  check('images', 'Image is required').notEmpty(),
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
      images: req.body.images
    });

    newSpace.save()
      .then(space => {
        res.json({ space })
      })
      .catch(err => console.log(err));
  }
);

router.get("/:id", auth, async (req, res) => {
  const allSpaces = await Space.find({});
  const userSpaces = await Space.find({ userid: req.params.id });
  return res.status(200).json({ allSpaces, userSpaces });
});

router.post('/upload-images', upload.array('imgCollection', 6), (req, res, next) => {
  const reqFiles = [];
  const url = req.protocol + '://' + req.get('host')
  for (var i = 0; i < req.files.length; i++) {
    reqFiles.push(url + '/public/' + req.files[i].filename)
  }

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    imgCollection: reqFiles
  });

  user.save().then(result => {
    res.status(201).json({
      message: "Done upload!",
      userCreated: {
        _id: result._id,
        imgCollection: result.imgCollection
      }
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      });
  })
})

module.exports = router;
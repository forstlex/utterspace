const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');

const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

router.post(
  "/signup",
  check('email', 'ToEmail is required'),
  auth,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log('TOEMAIL VALUE IS:', req.body.email);

    // create reusable transporter object using the default SMTP transport
    // let transporter = nodemailer.createTransport({
    //   host: 'smtp.gmail.com',
    //   port: 465,
    //   secure: false, // true for 465, false for other ports
    //   auth: {
    //     user: 'hello@utterspace.co',
    //     pass: 'Utterspace@hello'
    //   }
    // });

    // // send mail with defined transport object
    // let info;
    // try {
    //   info = await transporter.sendMail({
    //     from: 'hello@utterspace.co', // sender address
    //     to: 'kirill.palii2020@gmail.com', // req.body.toEmail
    //     subject: 'Welcom Sign up', // Subject line
    //     text: 'Hello world?', // plain text body
    //     html: '<b>Hello world?</b>' // html body
    //   });
    // } catch (error) {
    //   console.log('SENDING EMAIL ERROR:', error);
    // }

    // console.log('Message sent: %s', info.messageId);

    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'hello@utterspace.co',
        pass: 'Utterspace@hello'
      }
    });

    console.log('created');
    let info;
    try {
      info = await transporter.sendMail({
        from: 'hello@utterspace.co', // sender address
        to: 'kirill.palii2020@gmail.com', // req.body.toEmail
        subject: 'Welcom Sign up', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
      });
    } catch(err) {
      console.log('EMAIL SEND ERROR:', err);
    }
    

    // Preview only available when sending
    console.log('Preview URLaa: %s', nodemailer.getTestMessageUrl(info));
    if (info.messageId) {
      res.status(200).send({ send: true })
    }
    res.status(400).send({ send: false });
  }
);

module.exports = router;
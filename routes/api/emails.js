const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');

const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

const senderEmail = process.env.SENDERMAIL;
const senderPass = process.env.SENDERPASS;

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: senderEmail,
    pass: senderPass
  },
  service: 'Gmail',
  tls: {
    rejectUnauthorized: false
  }
});

router.post(
  "/signup",
  check('email', 'ToEmail is required'),
  auth,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const mailBody = `
    <div>
      <img style="text-align: center" src="cid:unique@utterlogo"/>
      <h3>Greetings,</h3>
      <h3>Thank you for signing up with Utterspace. We strive to provide rental solutions for unused space. </h3>
      <h3>Please take a moment to explore our first version of the platform and give us any feedback to help make it better.</h3>
      <h3>You can also reach out to us by simply replying back to this email.</h3>
      <h3>Yours Sincerely, </h3>
      <h3>Utterspace Team.</h3>
      <h3>Follow us on :</h3>
      <div>
        <a href="https://www.facebook.com/utterspace" style="-webkit-appearance: button; -moz-appearance: button; appearance: button; margin-right: 60px; text-decoration: none; color: initial;">Facebook</a>
        <a href="https://www.instagram.com/utterspace.co/" style="-webkit-appearance: button; -moz-appearance: button; appearance: button; margin-right: 60px; text-decoration: none; color: initial;">Instagram</a>
        <a href="https://www.linkedin.com/company/utterspace/" style="-webkit-appearance: button; -moz-appearance: button; appearance: button; margin-right: 60px; text-decoration: none; color: initial;">LinkedIn</a>
      </div>
    </div>      
    `;
    const mailOptions = {
      from: senderEmail, // sender address   
      to: req.body.email, // req.body.mail
      subject: 'Welcom Sign up', // Subject line
      html: mailBody,
      attachments: [{
        filename: 'logo.png',
        path: '../../client/src/logo.png',
        cid: 'unique@utterlogo' //same cid value as in the html img src
      }]
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(400).send({ errors: [{ msg: 'Unable to send email for sign up' }] });
      } else {
        res.status(200).send({ send: true })
      }
    });
  }
);

router.post(
  "/message",
  check('email', 'Email is required'),
  check('url', 'Message url is required'),
  auth,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const mailBody = `
    <div>
      <img style="text-align: center" src="cid:unique@utterlogo"/>
      <h3>Greetings,</h3>
      <h3>You have just received a message on your Utterspace account.  </h3>
      <h3>Click below to log in to your Utterspace account and  view your message: </h3>
      <input type="button" onclick="location.href=${req.body.url};" value="View Message" />
      <h3>Please take a moment to explore our first version of the platform and give us any feedback to help make it better. </h3>
      <h3>You can also reach out to us by simply replying back to this email. </h3>
      <h3>Yours Sincerely, </h3>
      <h3>Utterspace Team.</h3>
      <h3>Follow us on:</h3>
      <div>
        <a href="https://www.facebook.com/utterspace" style="-webkit-appearance: button; -moz-appearance: button; appearance: button; margin-right: 60px; text-decoration: none; color: initial;">Facebook</a>
        <a href="https://www.instagram.com/utterspace.co/" style="-webkit-appearance: button; -moz-appearance: button; appearance: button; margin-right: 60px; text-decoration: none; color: initial;">Instagram</a>
        <a href="https://www.linkedin.com/company/utterspace/" style="-webkit-appearance: button; -moz-appearance: button; appearance: button; margin-right: 60px; text-decoration: none; color: initial;">LinkedIn</a>
      </div>
    </div>
    `;
    const mailOptions = {
      from: senderEmail, // sender address   
      to: req.body.email, // req.body.mail
      subject: 'Welcom Sign up', // Subject line
      html: mailBody,
      attachments: [{
        filename: 'logo.png',
        path: '../../client/src/logo.png',
        cid: 'unique@utterlogo' //same cid value as in the html img src
      }]
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(400).send({ errors: [{ msg: 'Unable to send email for message' }] });
      } else {
        res.status(200).send({ send: true })
      }
    });
  }
);

router.post(
  "/take-booking",
  check('email', 'Email is required'),
  check('id', 'Booking id is required'),
  check('location', 'Location is required'),
  check('name', 'Seller name is required'),
  check('startdate', 'Start Date is required'),
  check('enddate', 'End Date is required'),
  auth,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const mailBody = `
    <div>
      <img style="text-align: center" src="cid:unique@utterlogo"/>
      <h3>Greetings,</h3>
      <h3>Order # ${req.body.id}</h3>
      <h3>Listing name: ${req.body.location}</h3>
      <h3>Seller Information: ${req.body.name}</h3>
      <h3>Booking from: ${req.body.startdate}</h3>
      <h3>Booking end: ${req.body.enddate}</h3>
      <h3>You will receive a separate email with your receipt for payment.   </h3>
      <h3>Please take a moment to explore our first version of the platform and give us any feedback to help make it better.</h3>
      <h3>You can also reach out to us by simply replying back to this email.</h3>
      <h3>Yours Sincerely, </h3>
      <h3>Utterspace Team.</h3>
      <h3>Follow us on :</h3>
      <div>
        <a href="https://www.facebook.com/utterspace" style="-webkit-appearance: button; -moz-appearance: button; appearance: button; margin-right: 60px; text-decoration: none; color: initial;">Facebook</a>
        <a href="https://www.instagram.com/utterspace.co/" style="-webkit-appearance: button; -moz-appearance: button; appearance: button; margin-right: 60px; text-decoration: none; color: initial;">Instagram</a>
        <a href="https://www.linkedin.com/company/utterspace/" style="-webkit-appearance: button; -moz-appearance: button; appearance: button; margin-right: 60px; text-decoration: none; color: initial;">LinkedIn</a>
      </div>
    </div>
    `;

    const mailOptions = {
      from: senderEmail, // sender address   
      to: req.body.email, // req.body.mail
      subject: 'Booking', // Subject line
      html: mailBody,
      attachments: [{
        filename: 'logo.png',
        path: '../../client/src/logo.png',
        cid: 'unique@utterlogo' //same cid value as in the html img src
      }]
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(400).send({ errors: [{ msg: 'Unable to send email for booking' }] });
      } else {
        res.status(200).send({ send: true })
      }
    });
  }
);

router.post(
  "/receive-booking",
  check('url', 'Booking Url is required'),
  auth,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const mailBody = `
    <div>
      <img style="text-align: center" src="cid:unique@utterlogo"/>
      <h3>Greetings,</h3>
      <h3>You have received a booking order for your listing on Utterspace. </h3>
      <h3>Click below to log in to your Utterspace dashboard and view the booking to accept the order.</h3>
      <input type="button" onclick="location.href=${req.body.url};" value="View Order" />
      <h3>Please take a moment to explore our first version of the platform and give us any feedback to help make it better.</h3>
      <h3>You can also reach out to us by simply replying back to this email.</h3>
      <h3>Yours Sincerely, </h3>
      <h3>Utterspace Team.</h3>
      <h3>Follow us on :</h3>
      <div>
        <a href="https://www.facebook.com/utterspace" style="-webkit-appearance: button; -moz-appearance: button; appearance: button; margin-right: 60px; text-decoration: none; color: initial;">Facebook</a>
        <a href="https://www.instagram.com/utterspace.co/" style="-webkit-appearance: button; -moz-appearance: button; appearance: button; margin-right: 60px; text-decoration: none; color: initial;">Instagram</a>
        <a href="https://www.linkedin.com/company/utterspace/" style="-webkit-appearance: button; -moz-appearance: button; appearance: button; margin-right: 60px; text-decoration: none; color: initial;">LinkedIn</a>
      </div>
    </div>      
    `;

    const mailOptions = {
      from: senderEmail, // sender address   
      to: req.body.email, // req.body.mail
      subject: 'Booking', // Subject line
      html: mailBody,
      attachments: [{
        filename: 'logo.png',
        path: '../../client/src/logo.png',
        cid: 'unique@utterlogo' //same cid value as in the html img src
      }]
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(400).send({ errors: [{ msg: 'Unable to send email for booking' }] });
      } else {
        res.status(200).send({ send: true })
      }
    });
  }
)

module.exports = router;
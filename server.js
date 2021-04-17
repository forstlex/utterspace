const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const os = require('os');
const dotenv = require('dotenv')
const users = require("./routes/api/users");
const spaces = require("./routes/api/spaces");

const app = express();

dotenv.config();
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

const dbName = os.platform() === "win32" ? 'utterSpace' : 'heroku';
// DB Config
const mongoURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.rfud4.mongodb.net/${dbName}?retryWrites=true&w=majority`

// Connect to MongoDB

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Passport middleware
app.use(passport.initialize());

app.use('/uploads', express.static('uploads'));

// Passport config
require("./config/passport")(passport);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Routes
app.use("/api/users", users);
app.use("/api/spaces", spaces);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));

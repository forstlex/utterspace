const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const os = require('os');
const dotenv = require('dotenv');
const { createProxyMiddleware } = require('http-proxy-middleware');

const userRoutes = require("./routes/api/users");
const spaceRoutes = require("./routes/api/spaces");
const bookingRoutes = require("./routes/api/bookings");
const messageRoutes = require('./routes/api/messages');

const { VERIFY_USER, LOGIN, USER_JOINED, ADD_USER, NEW_MESSAGE, TYPING, STOP_TYPING, USER_LEFT } = require('./client/src/events');

const app = express();

dotenv.config();
// Bodyparser middleware
app.use(express.json());
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
app.use("/api/users", userRoutes);
app.use("/api/spaces", spaceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/messages", messageRoutes);

const port = process.env.PORT || 5000;

const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(port, () => console.log(`Server up and running on port ${port} !`));

var numUsers = 0;
var users = [];

io.on('connection', (socket) => {
  var addedUser = false;

  socket.on(VERIFY_USER, (username, callback) => {
    if (users.includes(username)) {
      callback({ isUser: true, username: null })
    } else {
      callback({ isUser: false, username })
    }
  })

  // when the client emits 'add user', this listens and executes
  socket.on(ADD_USER, (username) => {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    users.push(username);
    addedUser = true;
    socket.emit(LOGIN, {
      users,
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit(USER_JOINED, {
      users,
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'new message', this listens and executes
  socket.on(NEW_MESSAGE, (data) => {
    // we tell the client to execute 'new message'
    socket.broadcast.emit(NEW_MESSAGE, {
      username: data.username,
      text: data.text,
      sender_id: data.sender_id,
      receiver_id: data.receiver_id,
      timestamp: data.timestamp
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on(TYPING, () => {
    socket.broadcast.emit(TYPING, {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on(STOP_TYPING, () => {
    socket.broadcast.emit(STOP_TYPING, {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    if (addedUser) {
      --numUsers;

      const newUsers = users.filter(username => username !== socket.username)
      users = newUsers;
      // echo globally that this client has left
      socket.broadcast.emit(USER_LEFT, {
        users,
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});

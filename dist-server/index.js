"use strict";

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _socket = _interopRequireDefault(require("socket.io"));

var _users = require("./users");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

var server = _http["default"].createServer(app); // sets up a new server instance of socket.io


var io = (0, _socket["default"])(server, {
  cors: {
    origin: '*'
  }
});
var PORT = process.env.PORT || 7000; // set up connection event listener between server and the client

var userMap = {};
var usersByRoomMap = {};
io.on('connection', function (socket) {
  console.log('user connected on socketID: ', socket.id);
  socket.on('join', function (userObj) {
    if (!userMap[userObj.userId]) {
      (0, _users.addUserUserMap)(userObj.userId, userObj.room, userObj.username, userMap); // io.to(userObj.room).emit('message', userMap);
    }

    if (!usersByRoomMap[userObj.userId + userObj.room]) {
      (0, _users.addUserByRoomMap)(userObj.userId, userObj.room, userObj.username, usersByRoomMap);
    } // console.log('this is the userMap: ', userMap);


    io.to(userObj.room).emit('join', usersByRoomMap);
  });
  var currentRoom; // broadcast message to 1 user connected

  socket.on("message", function (userObj) {
    if (userObj.room && userObj.room !== currentRoom) {
      currentRoom = userObj.room;
      socket.join(userObj.room);
    }

    var messageObj = {
      message: userObj.message || 'has joined the chat',
      id: userObj.userId,
      username: userObj.username,
      roomName: userObj.room,
      timestamp: new Date(),
      comment: 'this is coming from the server'
    }; // const joinedRoomObj = {
    //   message: `${userObj.username} has joined the chat`
    // }
    // io.to(userObj.room).emit('message', joinedRoomObj);

    io.to(userObj.room).emit('message', messageObj);
  }); // when user disconnects

  socket.on("disconnect", function () {
    console.log('USER DISCONNECTED');
    io.emit("message", 'a user has left the chat');
  });
});
app.get('/', function (req, res) {
  res.send('Hello World from the server');
});
server.listen(PORT, function () {
  console.log("Listening on port ".concat(PORT));
});
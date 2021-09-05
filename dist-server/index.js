"use strict";

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _socket = _interopRequireDefault(require("socket.io"));

var _users = require("./users");

var _utils = require("./utils");

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
      (0, _users.addUserInUserMap)(userObj.userId, userObj.room, userObj.username, userMap);
    }

    if (!usersByRoomMap[(0, _utils.getUserRoomKey)(userObj.userId + userObj.room)]) {
      (0, _users.addUserByRoomMap)(userObj.userId, userObj.room, userObj.username, usersByRoomMap);
    }

    console.log('this is userMap: ', userMap);
    console.log('this is usersByRoomMap: ', usersByRoomMap);
  });
  var currentRoom; // broadcast message to 1 user connected

  socket.on("message", function (userObj) {
    if (userObj.room && userObj.room !== currentRoom) {
      currentRoom = userObj.room;
      socket.join(userObj.room);
      io.to(userObj.room).emit('join', userMap);
    }

    var messageObj = {
      message: userObj.message || userObj.username + ' has joined the chat',
      id: userObj.userId,
      username: userObj.username,
      roomName: userObj.room,
      timestamp: new Date(),
      comment: 'this is coming from the server'
    };
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
"use strict";

var express = require('express');

var http = require('http');

var app = express();
var server = http.createServer(app);

var socket = require('socket.io'); // sets up a new server instance of socket.io


var io = socket(server, {
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
      userMap[userObj.userId] = userObj.username;
    }

    if (!usersByRoomMap[userObj.userId + userObj.room]) {
      usersByRoomMap[userObj.username + userObj.room] = [userObj.userId, userObj.room];
    }

    socket.to(userObj.room).emit('message', userMap);
    console.log('this is userMap: ', userMap);
    console.log('this is usersByRoomMap: ', usersByRoomMap);
  });
  var currentRoom; // broadcast message to 1 user connected

  socket.on("message", function (userObj) {
    if (userObj.room && userObj.room !== currentRoom) {
      currentRoom = userObj.room;
      socket.join(userObj.room);
    }

    var obj = {
      message: userObj.message,
      id: userObj.userId,
      username: userObj.username,
      roomName: userObj.room,
      timestamp: new Date(),
      comment: 'this is coming from the server'
    };
    io.to(userObj.room).emit('message', obj);
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
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
var rooms = ['Alana-Room', 'Phong-Room', 'Matt-Room'];
var PORT = process.env.PORT || 7000; // set up connection event listener between server and the client

io.on('connection', function (socket) {
  // const { id } = socket.client;
  // console.log(`User connected: ${id}`);
  console.log('socket obj: ', socket);
  console.log('user connected on socketID: ', socket.id);
  var obj2 = {
    rooms: rooms
  }; // we send back obj2 to room

  console.log('this is obj2: ', obj2);
  io.to(socket.id).emit('message', obj2); // broadcast message to 1 user connected

  socket.on("message", function (userObj, msg) {
    console.log('socketID: ', socket.id);
    console.log('userObj', userObj);

    if (userObj.room) {
      socket.join(userObj.room);
      console.log('user has joined this room: ', socket.room);
      var obj = {
        message: userObj.message,
        comment: 'this is coming from the server'
      };
      io.to(userObj.room).emit('message', obj);
    } // and then later
    // io.to(userId).emit('hi');
    // console.log(`Message received on server from ID: ${id}: ${msg}`);
    // socket.to(anotherSocketId).emit("message", socket.id, msg);
    // io.emit("message", msg);

  }); // socket.on('join_room', roomId => {
  //   socket.join(roomId);
  //   console.log('User joined room: ' + roomId);
  // })
  // broadcast to all clients when a user connects
  // socket.broadcast.emit("message", 'A user has joined the chat');
  // when user disconnects

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
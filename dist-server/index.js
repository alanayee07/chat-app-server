"use strict";

var express = require('express');

var http = require('http');

var app = express();
var server = http.createServer(app);

var socketIo = require('socket.io'); // sets up a new server instance of socket.io


var io = socketIo(server, {
  cors: {
    origin: '*'
  }
});
app.get('/', function (req, res) {
  res.send('Hello World from the server');
}); // set up connection event listener between server and the client

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('message', function (body) {
    console.log('Message received on server: ', body);
    io.emit('message', body);
  });
});
server.listen(7000, function () {
  console.log("Listening on port 7000");
});
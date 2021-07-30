"use strict";

var express = require('express');

var http = require('http');

var socketIo = require('socket.io');

var port = process.env.PORT || 4001;
var app = express();
var server = http.createServer(app); // sets up a new server instance of socket.io

var io = socketIo(server);
app.get('/', function (req, res) {
  res.send('Hello World from the server');
}); // set up connection event listener between server and the client

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('incoming data', function (data) {
    socket.broadcast.emit('outgoing data', {
      num: data
    });
  });
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});
server.listen(port, function () {
  console.log("Listening on port ".concat(port));
});
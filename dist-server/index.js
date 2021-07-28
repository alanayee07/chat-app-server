"use strict";

// const app = require('./app');
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`App is listening on port ${PORT}`);
// });
var express = require('express');

var app = express();

var http = require('http').createServer(app);

var io = require('socket.io')(http, {
  cors: {
    origin: ['http://localhost:3001']
  }
});

app.get('/', function (req, res) {
  res.send('Hello World from the server');
});
io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});
http.listen(3000, function () {
  console.log('listening on *:3000');
});
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socketIo = require('socket.io');
// sets up a new server instance of socket.io
const io = socketIo(server, {
  cors: {
    origin:'*',
  }
})



app.get('/', (req, res) => {
  res.send('Hello World from the server');
});

// set up connection event listener between server and the client
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('message', body => {
    console.log('Message received on server: ', body);
    io.emit('message', body)
  })
})

server.listen(7000, () => {
  console.log(`Listening on port 7000`);
})
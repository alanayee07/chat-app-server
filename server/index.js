const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const port = process.env.PORT || 4001;

const app = express();
const server = http.createServer(app);
// sets up a new server instance of socket.io
const io = socketIo(server);



app.get('/', (req, res) => {
  res.send('Hello World from the server');
});

// set up connection event listener between server and the client
io.on('connection', socket => {
  console.log('a user connected');
  socket.on('incoming data', data => {
    socket.broadcast.emit('outgoing data', {num: data})
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
})

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socketIo = require('socket.io');
// sets up a new server instance of socket.io
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});

const port = process.env.PORT || 4001;



app.get('/', (req, res) => {
  res.send('Hello World from the server');
});

// set up connection event listener between server and the client
io.on('connection', socket => {
  console.log('a user connected');
  socket.emit("your id", socket.id);
  socket.on('send message', body => {
    // all clients connected should receive msg
    console.log('message received on server: ', body);
    io.emit("message", body)
  })
})

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
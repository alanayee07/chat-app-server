const express = require('express');
const app = express();
const http = require('http').createServer(app);

// passing the http object and the cors options to allow our react localhost url, you can put in the url or your frontend client
const io = require('socket.io')(http, {
  cors: {
    origin: ['http://localhost:3001']
  }
})

app.get('/', (req, res) => {
  res.send('Hello World from the server');
});

// listen on the connection and disconnection events for incoming sockets and log into console
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
})

http.listen(3000, () => {
  console.log('listening on *:3000');
})
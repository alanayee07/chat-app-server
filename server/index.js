// const app = require('./app');

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`App is listening on port ${PORT}`);
// });

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: ['http://localhost:3001']
  }
})

app.get('/', (req, res) => {
  res.send('Hello World from the server');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
})

http.listen(3000, () => {
  console.log('listening on *:3000');
})
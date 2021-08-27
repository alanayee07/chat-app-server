const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socket = require('socket.io');
// sets up a new server instance of socket.io
const io = socket(server, {
  cors: {
    origin:'*',
  }
})

const PORT = process.env.PORT || 7000;

// set up connection event listener between server and the client

io.on('connection', (socket) => {
  // const { id } = socket.client;
  console.log('user connected on socketID: ', socket.id);

  let currentRoom;
  // broadcast message to 1 user connected
  socket.on("message", (userObj) => {
    console.log('userObj', userObj);
    if (userObj.room && (userObj.room !== currentRoom)) {
      currentRoom = userObj.room;
      socket.join(userObj.room);
    }
    const obj = {
      message: userObj.message,
      id: userObj.userId,
      username: userObj.username,
      roomName: userObj.room,
      comment: 'this is coming from the server',
    }
    io.to(userObj.room).emit('message', obj);
  })

  // when user disconnects
  socket.on("disconnect", () => {
    console.log('USER DISCONNECTED');
    io.emit("message", 'a user has left the chat');
  })
})

app.get('/', (req, res) => {
  res.send('Hello World from the server');
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})
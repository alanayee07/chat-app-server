import express from "express"
import http from 'http'
import socket from 'socket.io'
import {addUserInUserMap, addUserByRoomMap, removeUserInUserMap, removeUserByRoomMap} from './users'
import {getUserRoomKey, getExistingRoomById} from './utils'

const app = express();
const server = http.createServer(app);
// sets up a new server instance of socket.io
const io = socket(server, {
  cors: {
    origin:'*',
  }
})

const PORT = process.env.PORT || 7000;

// set up connection event listener between server and the client

const userMap = {};
const usersByRoomMap = {};

io.on('connection', (socket) => {
  console.log('user connected on socketID: ', socket.id);

  socket.on('join', (userObj) => {

    const existingRoomName = getExistingRoomById(userObj.userId, usersByRoomMap);

    if (existingRoomName) {
      removeUserByRoomMap(userObj.userId, existingRoomName, usersByRoomMap);
    }
    addUserByRoomMap(userObj.userId, userObj.room, usersByRoomMap);

    if (!userMap[userObj.userId]) {
      addUserInUserMap(userObj.userId, userObj.username, userMap);
    }


    socket.join(userObj.room);
    io.emit('join', userMap, usersByRoomMap);
    console.log('this is userMap: ', userMap);
    console.log('this is usersByRoomMap: ', usersByRoomMap)
  })

  socket.on("message", (userObj) => {


    const messageObj = {
      message: userObj.message || userObj.username + ' has joined the chat',
      id: userObj.userId,
      username: userObj.username,
      roomName: userObj.room,
      timestamp: new Date(),
      comment: 'this is coming from the server',
      isChatBot: !userObj.message
    }
    io.to(userObj.room).emit('message', messageObj);
  })

  // when user disconnects
  socket.on("disconnect", () => {
    console.log('USER DISCONNECTED');
  })
})

app.get('/', (req, res) => {
  res.send('Hello World from the server');
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})
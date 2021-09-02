// const express = require('express');
// const http = require('http');
// const socket = require('socket.io');
import express from "express"
import http from 'http'
import socket from 'socket.io'
import {addUser} from './users'

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

    if (!userMap[userObj.userId]) {
      addUserUserMap(userObj.userId, userObj.room, userObj.username, userMap);
    }
    console.log('this is userMap: ', userMap);
    // if (!userMap[userObj.userId]) {
    //   userMap[userObj.userId] = userObj.username;
    // }
    // if (!usersByRoomMap[userObj.userId+userObj.room]) {
    //   usersByRoomMap[userObj.username+userObj.room] = [userObj.userId, userObj.room];
    // }
    // socket.to(userObj.room).emit('message', userMap);
    // console.log('this is userMap: ', userMap)
    // console.log('this is usersByRoomMap: ', usersByRoomMap);
  })


  let currentRoom;
  // broadcast message to 1 user connected
  socket.on("message", (userObj) => {
    if (userObj.room && (userObj.room !== currentRoom)) {
      currentRoom = userObj.room;
      socket.join(userObj.room);
    }

    const obj = {
      message: userObj.message,
      id: userObj.userId,
      username: userObj.username,
      roomName: userObj.room,
      timestamp: new Date(),
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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addUserByRoomMap = exports.addUserUserMap = void 0;

// const userMap = {};
// const usersByRoomMap = {};
// userMap functions
var addUserUserMap = function addUserUserMap(userId, roomName, username, obj) {
  obj[userId + room] = username;
};

exports.addUserUserMap = addUserUserMap;

var removeUser = function removeUser() {}; // usersByRoomMap functions


var addUserByRoomMap = function addUserByRoomMap(userId, roomName, username, obj) {
  obj[userId + room] = [userId, room];
};

exports.addUserByRoomMap = addUserByRoomMap;
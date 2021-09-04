"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addUserByRoomMap = exports.addUserUserMap = void 0;

// const userMap = {};
// const usersByRoomMap = {};
// userMap functions
var addUserUserMap = function addUserUserMap(userId, room, username, obj) {
  obj[userId + room] = username;
};

exports.addUserUserMap = addUserUserMap;

var removeUser = function removeUser() {};

var getUser = function getUser() {}; // usersByRoomMap functions


var addUserByRoomMap = function addUserByRoomMap(userId, room, username, obj) {
  obj[userId + room] = [userId, room];
  obj.message = 'user has entered the chat';
};

exports.addUserByRoomMap = addUserByRoomMap;
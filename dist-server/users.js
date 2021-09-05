"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addUserByRoomMap = exports.addUserInUserMap = void 0;

var _utils = require("./utils");

// const userMap = {};
// const usersByRoomMap = {};
// userMap functions
var addUserInUserMap = function addUserInUserMap(userId, roomName, username, userMap) {
  userMap[userId] = username;
};

exports.addUserInUserMap = addUserInUserMap;

var removeUser = function removeUser() {}; // usersByRoomMap functions


var addUserByRoomMap = function addUserByRoomMap(userId, roomName, username, usersByRoomMap) {
  var userRoomKey = (0, _utils.getUserRoomKey)(userId, roomName);
  obj[userRoomKey] = [userId, room];
};

exports.addUserByRoomMap = addUserByRoomMap;
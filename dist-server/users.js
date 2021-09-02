"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addUserUserMap = void 0;

// const userMap = {};
// const usersByRoomMap = {};
// userMap functions
var addUserUserMap = function addUserUserMap(userId, room, username, obj) {
  obj[userId + room] = username;
};

exports.addUserUserMap = addUserUserMap;

var removeUser = function removeUser() {};

var getUser = function getUser() {};
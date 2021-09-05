"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserRoomKey = void 0;

var getUserRoomKey = function getUserRoomKey(userId, roomName) {
  return "".concat(userId, "-").concat(roomName);
};

exports.getUserRoomKey = getUserRoomKey;
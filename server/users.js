// const userMap = {};
// const usersByRoomMap = {};

import {getUserRoomKey} from './utils'

// userMap functions
export const addUserInUserMap = (userId, roomName, username, userMap) => {
  userMap[userId] = username;
}

const removeUser = () => {

}

// usersByRoomMap functions

export const addUserByRoomMap = (userId, roomName, username, usersByRoomMap) => {
  const userRoomKey = getUserRoomKey(userId, roomName);
  obj[userRoomKey] = [userId, room];
}

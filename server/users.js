// const userMap = {};
// const usersByRoomMap = {};

import {getUserRoomKey} from './utils'

/**
 * user added to userMap
 * @param {*} userId
 * @param {*} username
 * @param {*} userMap
 */
export const addUserInUserMap = (userId, username, userMap) => {
  userMap[userId] = username;
}

/**
 * when user disconnects from chat app
 * @param {*} userId
 * @param {*} username
 * @param {*} userMap
 */
export const removeUserInUserMap = (userId, username, userMap) => {
  if (userMap[userId]) {
    delete userMap[userId];
  }
}

/**
 * when user is added to usersByRoomMap
 * @param {*} userId
 * @param {*} roomName
 * @param {*} usersByRoomMap
 */

export const addUserByRoomMap = (userId, roomName,  usersByRoomMap) => {
  const userRoomKey = getUserRoomKey(userId, roomName);
  usersByRoomMap[userRoomKey] = [userId, roomName];
}

/**
 * when user leaves current chatroom
 * @param {*} userId
 * @param {*} roomName
 * @param {*} usersByRoomMap
 */
export const removeUserByRoomMap = (userId, roomName, usersByRoomMap) => {
  const userRoomKey = getUserRoomKey(userId, roomName);
  if (usersByRoomMap[userRoomKey]) {
    delete usersByRoomMap[userRoomKey];
  }
}

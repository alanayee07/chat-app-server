// const userMap = {};
// const usersByRoomMap = {};

// userMap functions
export const addUserUserMap = (userId, room, username, obj) => {
  obj[userId+room] = username;

}

const removeUser = () => {

}

const getUser = () => {

}

// usersByRoomMap functions

export const addUserByRoomMap = (userId, room, obj) => {
  obj[userId+room] = [userId, room];
}

export const getUserRoomKey = (userId, roomName) => {
  return `${userId}-${roomName}`;
}

export const getExistingRoomById = (userId, usersByRoomMap) => {
  for (let key in usersByRoomMap) {
    if (usersByRoomMap[key][0] === userId) {
		  return usersByRoomMap[key][1];
	  }
  }
}
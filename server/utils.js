export const getUserRoomKey = (userId, roomName) => {
  return `${userId}-${roomName}`;
}
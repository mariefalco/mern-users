import axios from "axios";

const sendFriendRequest = userId => axios.patch(`/api/users/${userId}`);
const getMyFriendRequests = () => axios.get("/api/friend_requests");
const acceptFriendRequest = reqId =>
  axios.patch(`/api/friend_requests&${reqId}`);
const rejectFriendRequest = reqId =>
  axios.delete(`/api/friend_requests&${reqId}`);
const getMyFriends = () => axios.get("/api/friends");
const deleteFriend = friendId => axios.delete(`/api/friends&${friendId}`);

export const friendService = {
  sendFriendRequest,
  getMyFriendRequests,
  acceptFriendRequest,
  rejectFriendRequest,
  getMyFriends,
  deleteFriend
};

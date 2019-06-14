import axios from "axios";

const getMe = () => axios.get("/api/");
const getUsers = () => axios.get("/api/users");
const getUser = userId => axios.get(`/api/users/${userId}`);

export const userService = {
  getMe,
  getUsers,
  getUser
};

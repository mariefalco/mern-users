import axios from "axios";

const getMe = () => axios.get("/api/home/");
const getUsers = () => axios.get("/api/home/users");
const getUser = userId => axios.get(`/api/home/users/${userId}`);

export const userService = {
  getMe,
  getUsers,
  getUser
};

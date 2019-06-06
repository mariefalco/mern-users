import axios from "axios";
axios.defaults.headers.common["Authorization"] = localStorage.getItem(
  "jwtToken"
);

const getMe = () => axios.get("/api/home/");
const getUsers = () => axios.get("/api/home/users");
const getUser = userId => axios.get(`/api/home/users/${userId}`);

export const userService = {
  getMe,
  getUsers,
  getUser
};

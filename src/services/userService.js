import axios from "axios";

const getHome = () => axios.get("/api/home/");
const getUsers = () => axios.get("/api/home/users");
const getUser = userId => axios.get(`/api/home/users/${userId}`);

export const userService = {
  getHome,
  getUsers,
  getUser
};

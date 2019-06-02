import axios from "axios";

const getHome = () => axios.get("/api/home/");
const getUsers = () => axios.get("/api/home/users");

export const userService = {
  getHome,
  getUsers
};

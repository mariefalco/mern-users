import axios from "axios";

const setToken = result => {
  localStorage.setItem("jwtToken", "Bearer " + result.data.token);
};
const getToken = () => {
  axios.defaults.headers.common["Authorization"] = localStorage.getItem(
    "jwtToken"
  );
};

const logout = () => {
  localStorage.removeItem("jwtToken");
  window.location.reload();
};

const login = (email, password) =>
  axios.post("/api/home/auth/sign_in", { email, password });

const registration = (name, email, password) =>
  axios.post("/api/home/auth/registration", { name, email, password });

export const authService = {
  setToken,
  getToken,
  login,
  registration,
  logout
};

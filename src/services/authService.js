import axios from "axios";

const isLogged = () => !!localStorage.getItem("jwtToken");

const setToken = result => {
  localStorage.setItem("jwtToken", "Bearer " + result.data.token);
};

const logout = () => {
  localStorage.removeItem("jwtToken");
  window.location.reload();
};

const login = (email, password) =>
  axios
    .post("/api/home/auth/sign_in", { email, password })
    .then(result => {
      setToken(result);
      return { message: "" };
    })
    .catch(error => {
      return {
        message: error.response.data.message
      };
    });

const registration = (name, email, password) =>
  axios.post("/api/home/auth/registration", { name, email, password });

export const authService = {
  isLogged,
  login,
  registration,
  logout
};

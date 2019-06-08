import axios from "axios";

const isLogged = () => !!localStorage.getItem("jwtToken");

const setToken = result => {
  localStorage.setItem("id", result.data.id);
  localStorage.setItem("name", result.data.name);
  localStorage.setItem("refreshToken", result.data.refreshToken);
  localStorage.setItem("jwtToken", "Bearer " + result.data.token);
};

const logout = () => {
  axios
    .patch("/api/auth/delete_token", {
      refreshToken: localStorage.getItem("refreshToken")
    })
    .catch(error => {
      console.log(error);
    });
  localStorage.removeItem("id");
  localStorage.removeItem("name");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("jwtToken");
  window.location.reload();
};

const login = (email, password) =>
  axios
    .post("/api/auth/sign_in", { email, password })
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
  axios.post("/api/auth/registration", { name, email, password });

export const authService = {
  isLogged,
  login,
  registration,
  setToken,
  logout
};

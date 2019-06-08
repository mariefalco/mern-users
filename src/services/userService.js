import axios from "axios";
import { authService } from "./authService";

let isRefreshing = false;
let refreshSubscribers = [];

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const {
      config,
      response: { status }
    } = error;
    const originalRequest = config;

    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        axios
          .patch("/api/auth/refresh_token", {
            id: localStorage.getItem("id"),
            name: localStorage.getItem("name"),
            refreshToken: localStorage.getItem("refreshToken")
          })
          .then(response => {
            authService.setToken(response);
            let newToken = response.data.token;
            isRefreshing = false;
            onRrefreshed(newToken);
          })
          .catch(error => {
            authService.logout();
            return Promise.reject(error);
          });
      }

      const retryOrigReq = new Promise((resolve, reject) => {
        subscribeTokenRefresh(token => {
          // replace the expired token and retry
          originalRequest.headers["Authorization"] = "Bearer " + token;
          resolve(axios(originalRequest));
        });
      });
      return retryOrigReq;
    } else {
      return Promise.reject(error);
    }
  }
);

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

function onRrefreshed(token) {
  refreshSubscribers.map(cb => cb(token));
}

axios.interceptors.request.use(function(config) {
  const token = localStorage.getItem("jwtToken");
  config.headers.Authorization = token;

  return config;
});

const getMe = () => axios.get("/api/");
const getUsers = () => axios.get("/api/users");
const getUser = userId => axios.get(`/api/users/${userId}`);

export const userService = {
  getMe,
  getUsers,
  getUser
};

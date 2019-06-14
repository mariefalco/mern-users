import axios from "axios";

// refreshing token
let isRefreshing = false;
let refreshSubscribers = [];

axios.interceptors.response.use(
  response => response,
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
            setToken(response);
            let newToken = response.data.token;
            isRefreshing = false;
            onRrefreshed(newToken);
          })
          .catch(error => {
            logout();
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

// headers
axios.interceptors.request.use(function(config) {
  const token = localStorage.getItem("jwtToken");
  config.headers.Authorization = token;

  return config;
});

// authorization
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

// import { AuthHelper } from "@/utils/helpers/authHelper";
// import axios from "axios";
// import { AuthAPI } from "./helper";

const VERSION = "v1";
const BASE_URL = "http://localhost:8080/api/" + VERSION;

// const instance = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// instance.interceptors.request.use(
//   (config) => {
//     const token = AuthHelper.getLocalAccessToken();
//     if (token) {
//       config.headers["Authorization"] = "Bearer " + token; // for Spring Boot
//       //   config.headers["x-access-token"] = token; // for Node.js Express
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// instance.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = AuthHelper.getLocalRefreshToken();
//         const response = await axios.post(BASE_URL + AuthAPI.refreshToken, {
//           refreshToken,
//         });
//         const { token } = response.data;

//         AuthHelper.setLocalAccessToken(token);
//         originalRequest.headers.Authorization = `Bearer ${token}`;

//         return axios(originalRequest);
//       } catch (_error) {
//         return Promise.reject(_error);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default instance;

import { AuthHelper } from "@/utils/helpers/authHelper";
import axios from "axios";
import { AuthAPI } from "./helper";

const axiosInstance = axios.create({
  // timeout: 1000, //Thời gian hết hạn
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = AuthHelper.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      AuthHelper.removeTokens();
      // window.location.href = "/";
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  (err) => {
    const originalRequest = err.config;

    if (err.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ` + token;
            return axios(originalRequest);
          })
          .catch((err) => {
            return err;
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const accessToken = AuthHelper.getAccessToken();
      const refreshToken = AuthHelper.getRefreshToken();

      // const tokenData = {
      //   accessToken,
      //   refreshToken,
      // };

      return new Promise(function (resolve, reject) {
        axios
          .post(AuthAPI.refreshToken, refreshToken)
          .then((res) => {
            AuthHelper.setTokens(res.data.Data.accessToken, refreshToken);
            originalRequest.headers.Authorization = `Bearer ${res.data.Data.accessToken}`;
            resolve(axios(originalRequest));
            processQueue(null, res.data.Data.accessToken);
          })
          .catch((err) => {
            processQueue(err, null);
            reject(err);
            AuthHelper.removeTokens();
            // window.location.href = "/";
          })
          .then(() => {
            isRefreshing = false;
          });
      });
    }
    return Promise.reject(err);
  }
);
export default axiosInstance;

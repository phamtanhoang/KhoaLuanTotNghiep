import { AuthHelper } from "@/utils/helpers/authHelper";
import axios from "axios";
import { AuthAPI } from "../Apis";

const VERSION = "v1";
const BASE_URL = "http://localhost:8080/api/" + VERSION;

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
      AuthHelper.removeAuthenticaton();
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

      const body = {
        refreshToken: AuthHelper.getRefreshToken(),
      };
      return new Promise(function (resolve, reject) {
        axios
          .post(BASE_URL + AuthAPI.refreshToken, body)
          .then((res) => {
            AuthHelper.setTokens(
              res.data.Data.accessToken,
              res.data.Data.refreshToken
            );
            originalRequest.headers.Authorization = `Bearer ${res.data.Data.accessToken}`;
            resolve(axios(originalRequest));
            processQueue(null, res.data.Data.accessToken);
          })
          .catch((err) => {
            processQueue(err, null);
            reject(err);
            AuthHelper.removeAuthenticaton();
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

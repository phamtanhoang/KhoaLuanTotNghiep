import { AuthHelper } from "@/utils/helpers/authHelper";
import axios from "axios";
import { AuthAPI } from "./helper";

const VERSION = "v1";
const BASE_URL = "http://localhost:8080/api/" + VERSION;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = AuthHelper.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token; // for Spring Boot
      //   config.headers["x-access-token"] = token; // for Node.js Express
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = AuthHelper.getLocalRefreshToken();
        const response = await axios.post(BASE_URL + AuthAPI.refreshToken, {
          refreshToken,
        });
        const { token } = response.data;

        AuthHelper.setLocalAccessToken(token);
        originalRequest.headers.Authorization = `Bearer ${token}`;

        return axios(originalRequest);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;

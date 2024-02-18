import { ApiConstants } from "@/utils/constants";
import { AuthHelper } from "@/utils/helpers/dateHelper";
import axios from "axios";

const instance = axios.create({
  baseURL: ApiConstants.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = AuthHelper.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token; // for Spring Boot back-end
      //   config.headers["x-access-token"] = token; // for Node.js Express back-end
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
        const response = await axios.post("/api/refresh-token", {
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

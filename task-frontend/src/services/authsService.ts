import axiosInstance from "@/configs/axiosInstance";
import { AuthAPI } from "@/configs/helper";

const authsService = {
  async signin(email: string, password: string) {
    const userData = {
      username: email,
      password: password,
    };
    return await axiosInstance.post(AuthAPI.signin, userData, {
      headers: { "Content-Type": "application/json" },
    });
  },
};
export default authsService;

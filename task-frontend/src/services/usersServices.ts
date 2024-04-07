import axiosInstance from "@/configs/axiosInstance";
import { UserAPI } from "@/configs/helper";

const usersService = {
  async getByEmail(email: string) {
    return await axiosInstance.get(UserAPI.getByEmail(email), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
export default usersService;

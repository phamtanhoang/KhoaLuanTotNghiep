import axiosConfig from "@/configs/axiosConfig";
import { UserAPI } from "@/configs/apis";

const usersService = {
  async getByEmail(email: string) {
    return await axiosConfig.get(UserAPI.getByEmail(email), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
export default usersService;

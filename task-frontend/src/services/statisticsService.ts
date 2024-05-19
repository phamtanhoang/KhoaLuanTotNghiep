import axiosConfig from "@/configs/axiosConfig";
import { StatisticsAPI } from "@/Apis";

const statisticsService = {
  async getCount_admin() {
    return await axiosConfig.get(StatisticsAPI.getCount_admin);
  },
  async getCount() {
    return await axiosConfig.get(StatisticsAPI.getCount);
  },
};
export default statisticsService;

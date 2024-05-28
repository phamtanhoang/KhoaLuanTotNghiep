import axiosConfig from "@/configs/axiosConfig";
import { StatisticsAPI } from "@/Apis";

const statisticsService = {
  async getCount_admin() {
    return await axiosConfig.get(StatisticsAPI.getCount_admin);
  },
  async getCount() {
    return await axiosConfig.get(StatisticsAPI.getCount);
  },
  async getStatisticByYear(year: number) {
    return await axiosConfig.get(StatisticsAPI.getStatisticByYear(year));
  },
};
export default statisticsService;

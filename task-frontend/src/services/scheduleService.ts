import axiosConfig from "@/configs/axiosConfig";
import { ScheduleAPI } from "@/Apis";

const scheduleService = {
  async getDataSchedule() {
    return await axiosConfig.get(ScheduleAPI.getDataSchedule);
  },
};
export default scheduleService;

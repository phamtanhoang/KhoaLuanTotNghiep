import axiosConfig from "@/configs/axiosConfig";
import { ScheduleAPI } from "@/Apis";

const scheduleService = {
  async getDataSchedule(id?: string, fromDate?: string, toDate?: string) {
    return await axiosConfig.get(
      ScheduleAPI.getDataSchedule(id, fromDate, toDate)
    );
  },
};
export default scheduleService;

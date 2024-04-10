import axiosConfig from "@/configs/axiosConfig";
import { CandidateAPI } from "@/configs/helper";

const candidatesService = {
  async profile() {
    return await axiosConfig.get(CandidateAPI.profile, {
      headers: { "Content-Type": "application/json" },
    });
  },
};
export default candidatesService;

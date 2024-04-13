import axiosConfig from "@/configs/axiosConfig";
import { CandidateAPI } from "@/configs/helper";

const candidatesService = {
  async profile() {
    return await axiosConfig.get(CandidateAPI.profile, {
      headers: { "Content-Type": "application/json" },
    });
  },
  async getList(
    name?: string,
    status?: string,
    currentPage?: number,
    itemPerPage?: number
  ) {
    return await axiosConfig.get(
      CandidateAPI.getList(name, status, currentPage, itemPerPage)
    );
  },
  async update(id: string, status: string) {
    const body = {
      status: status,
    };
    return await axiosConfig.patch(CandidateAPI.candidateById(id), body, {
      headers: { "Content-Type": "application/json" },
    });
  },
  async delete(id: string) {
    return await axiosConfig.delete(CandidateAPI.candidateById(id), {
      headers: { "Content-Type": "application/json" },
    });
  },
  async getbyId(id: string) {
    return await axiosConfig.get(CandidateAPI.candidateById(id), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
export default candidatesService;

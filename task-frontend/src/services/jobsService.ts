import axiosConfig from "@/configs/axiosConfig";
import { JobAPI } from "@/configs/apis";

const jobsService = {
  async getList_Employer(
    keyword?: string,
    category?: string,
    status?: string,
    currentPage?: number,
    itemPerPage?: number
  ) {
    return await axiosConfig.get(
      JobAPI.getList_Employer(
        keyword,
        category,
        status,
        currentPage,
        itemPerPage
      )
    );
  },
  async create(
    name: string,
    description: string,
    toDate: string,
    location: string,
    fromSalary: string,
    toSalary: string,
    experience: string,
    categoryId: string,
    humanResourceId: string,
    processId: string,
    tags: any[]
  ) {
    const body = {
      name: name.trim(),
      description: description.trim(),
      toDate: `${toDate}T00:00:00`,
      location: location.trim(),
      fromSalary: fromSalary.trim(),
      toSalary: toSalary.trim(),
      experience: experience.trim(),
      categoryId: categoryId,
      humanResourceId: humanResourceId,
      processId: processId,
      tags: tags,
    };
    return await axiosConfig.post(JobAPI.createJob, body, {
      headers: { "Content-Type": "application/json" },
    });
  },

  async delete(id: string) {
    return await axiosConfig.delete(JobAPI.jobById(id));
  },

  async getDetail_Employer(id: string) {
    return await axiosConfig.get(JobAPI.getDetail_Employer(id));
  },

  async getDetail_Admin(id: string) {
    return await axiosConfig.get(JobAPI.getDetail_Admin(id));
  },
};
export default jobsService;

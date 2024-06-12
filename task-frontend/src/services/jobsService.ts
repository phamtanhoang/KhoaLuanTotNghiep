import axiosConfig from "@/configs/axiosConfig";
import { JobAPI } from "@/Apis";

const jobsService = {
  async saveJob(id: string) {
    return await axiosConfig.post(JobAPI.saveJobs(id));
  },
  async unSaveJob(id: string) {
    return await axiosConfig.delete(JobAPI.unSaveJobs(id));
  },
  async getList_Public(
    keyword?: string,
    location?: string,
    category?: string,
    tag?: string,
    dateNumber?: string,
    experience?: string,
    currentPage?: number,
    itemPerPage?: number
  ) {
    return await axiosConfig.get(
      JobAPI.getList_Public(
        keyword,
        location,
        category,
        tag,
        dateNumber,
        experience,
        currentPage,
        itemPerPage
      )
    );
  },
  async getList_Employer(
    keyword?: string,
    category?: string,
    status?: string,
    isExpired?: boolean,
    currentPage?: number,
    itemPerPage?: number
  ) {
    return await axiosConfig.get(
      JobAPI.getList_Employer(
        keyword,
        category,
        status,
        isExpired,
        currentPage,
        itemPerPage
      )
    );
  },
  async getList_Admin(
    keyword?: string,
    category?: string,
    status?: string,
    isExpired?: boolean,
    currentPage?: number,
    itemPerPage?: number
  ) {
    return await axiosConfig.get(
      JobAPI.getList_Admin(
        keyword,
        category,
        status,
        isExpired,
        currentPage,
        itemPerPage
      )
    );
  },
  async getJobsByEmployerID(
    id: string,
    name?: string,
    location?: string,
    currentPage?: number,
    itemPerPage?: number
  ) {
    return await axiosConfig.get(
      JobAPI.getJobsByEmployerID(id, name, location, currentPage, itemPerPage)
    );
  },
  async getSavedJobs(
    name?: string,
    location?: string,
    currentPage?: number,
    itemPerPage?: number
  ) {
    return await axiosConfig.get(
      JobAPI.getSavedJobs(name, location, currentPage, itemPerPage)
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

  async getDetail_Public(id: string) {
    return await axiosConfig.get(JobAPI.getDetail_Public(id));
  },
  async getDetail_Employer(id: string) {
    return await axiosConfig.get(JobAPI.getDetail_Employer(id));
  },

  async getDetail_Admin(id: string) {
    return await axiosConfig.get(JobAPI.getDetail_Admin(id));
  },

  async updateStatus_Admin(id: string, status: string) {
    const body = {
      status: status,
    };
    return await axiosConfig.patch(JobAPI.updateStatus_Admin(id), body, {
      headers: { "Content-Type": "application/json" },
    });
  },
  async updateStatus_Employer(id: string, status: string) {
    const body = {
      status: status,
    };
    return await axiosConfig.patch(JobAPI.updateStatus_Employer(id), body, {
      headers: { "Content-Type": "application/json" },
    });
  },
  async updateDateline(id: string, toDate: string) {
    const body = {
      toDate: toDate,
    };
    return await axiosConfig.patch(JobAPI.updateDateline(id), body, {
      headers: { "Content-Type": "application/json" },
    });
  },

  async getNewJobs(currentPage?: number, itemPerPage?: number) {
    return await axiosConfig.get(JobAPI.getNewJobs(currentPage, itemPerPage));
  },
  async getTopJobs(currentPage?: number, itemPerPage?: number) {
    return await axiosConfig.get(JobAPI.getTopJobs(currentPage, itemPerPage));
  },
  async getTop(currentPage?: number, itemPerPage?: number) {
    return await axiosConfig.get(JobAPI.getTop(currentPage, itemPerPage));
  },
  async getPendingJob(currentPage?: number, itemPerPage?: number) {
    return await axiosConfig.get(
      JobAPI.getPendingJob(currentPage, itemPerPage)
    );
  },
  async getActiveJob(currentPage?: number, itemPerPage?: number) {
    return await axiosConfig.get(JobAPI.getActiveJob(currentPage, itemPerPage));
  },
  async getPendingJob_Admin(currentPage?: number, itemPerPage?: number) {
    return await axiosConfig.get(
      JobAPI.getPendingJob_Admin(currentPage, itemPerPage)
    );
  },
  async getSimilar(id: string, currentPage?: number, itemPerPage?: number) {
    return await axiosConfig.get(
      JobAPI.getSimilar(id, currentPage, itemPerPage)
    );
  },
};
export default jobsService;

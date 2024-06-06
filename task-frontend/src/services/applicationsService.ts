import { ApplicationAPI } from "@/Apis";
import axiosConfig from "@/configs/axiosConfig";

const applicationsService = {
  async applyJob_File(
    id: string,
    name: string,
    email: string,
    phoneNumber: string,
    letter: string,
    cv: File | null
  ) {
    const formData = new FormData();
    formData.append("fullName", name.trim());
    formData.append("email", email.trim());
    formData.append("phoneNumber", phoneNumber.trim());
    formData.append("letter", letter.trim());
    if (cv) formData.append("cVFile", cv);
    return await axiosConfig.post(ApplicationAPI.applyJob_File(id), formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  async applyJob_Link(
    id: string,
    name: string,
    email: string,
    phoneNumber: string,
    letter: string,
    cv: string
  ) {
    const formData = new FormData();
    formData.append("fullName", name.trim());
    formData.append("email", email.trim());
    formData.append("phoneNumber", phoneNumber.trim());
    formData.append("letter", letter.trim());
    formData.append("cVFile", cv.trim());
    return await axiosConfig.post(ApplicationAPI.applyJob_Link(id), formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  async getApplications_Employer(
    name?: string,
    status?: string,
    currentPage?: number,
    itemPerPage?: number
  ) {
    return await axiosConfig.get(
      ApplicationAPI.getApplication_Employer(
        name,
        status,
        currentPage,
        itemPerPage
      )
    );
  },
  async getApplications_Candidate(
    name?: string,
    location?: string,
    status?: string,
    currentPage?: number,
    itemPerPage?: number
  ) {
    return await axiosConfig.get(
      ApplicationAPI.getApplication_Candidate(
        name,
        location,
        status,
        currentPage,
        itemPerPage
      )
    );
  },
  async getApplicationDetail_Candidate(id: string) {
    return await axiosConfig.get(
      ApplicationAPI.getApplicationDetail_Candidate(id)
    );
  },
  async getApplicationDetail_Employer(id: string) {
    return await axiosConfig.get(
      ApplicationAPI.getApplicationDetail_Employer(id)
    );
  },

  async getMessagesApplication(id: string) {
    return await axiosConfig.get(ApplicationAPI.getMessagesApplication(id));
  },
  async sendMessagesApplication(
    id: string,
    content: string,
    file: File | null
  ) {
    const formData = new FormData();
    formData.append("content", content.trim());
    if (file) formData.append("file", file);
    return await axiosConfig.post(
      ApplicationAPI.sendMessagesApplication(id),
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  },
  async updateStatus(id: string, status: string, result: string) {
    const body = {
      status: status,
      result: result,
    };
    return await axiosConfig.patch(ApplicationAPI.updateStatus(id), body, {
      headers: { "Content-Type": "application/json" },
    });
  },

  async createStepSchedule(
    id: string,
    name: string,
    startDate: string,
    hour: number,
    color: string,
    stepNumber: number
  ) {
    const body = {
      name: name.trim(),
      startDate: startDate.trim(),
      hour: hour,
      color: color.trim(),
      stepNumber: stepNumber,
    };
    console.log("body,  ", body);

    return await axiosConfig.post(ApplicationAPI.createStepSchedule(id), body, {
      headers: { "Content-Type": "application/json" },
    });
  },

  async updateStepSchedule(
    id: string,
    name: string,
    startDate: string,
    hour: number,
    color: string
  ) {
    const body = {
      name: name,
      startDate: startDate,
      hour: hour,
      color: color,
    };

    return await axiosConfig.patch(
      ApplicationAPI.updateStepSchedule(id),
      body,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  },
  async detailStepSchedule(id: string) {
    return await axiosConfig.get(ApplicationAPI.detailStepSchedule(id));
  },
  async deleteStepSchedule(id: string) {
    return await axiosConfig.delete(ApplicationAPI.deleteStepSchedule(id));
  },

  async getPending_Employer(currentPage?: number, itemPerPage?: number) {
    return await axiosConfig.get(
      ApplicationAPI.getPending_Employer(currentPage, itemPerPage)
    );
  },
  async deleteApplication(id: string) {
    return await axiosConfig.delete(ApplicationAPI.deleteApplication(id));
  },
};
export default applicationsService;

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
};
export default applicationsService;

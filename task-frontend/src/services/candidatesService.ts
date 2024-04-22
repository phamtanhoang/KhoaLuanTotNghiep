import axiosConfig from "@/configs/axiosConfig";
import { CandidateAPI } from "@/configs/apis";

const candidatesService = {
  async profile() {
    return await axiosConfig.get(CandidateAPI.profile);
  },
  async extraProfile() {
    return await axiosConfig.get(CandidateAPI.extraProfile);
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

  async changeImage(image: File | null) {
    const formData = new FormData();
    if (image) formData.append("avatar", image);
    return await axiosConfig.patch(CandidateAPI.changeImage, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  async updateProfile(
    firstName?: string,
    lastName?: string,
    address?: string,
    phoneNumber?: string,
    dateOfBirth?: string,
    link?: string,
    job?: string,
    introduction?: string,
    sex?: string
  ) {
    const body = {
      firstName: firstName?.trim(),
      lastName: lastName?.trim(),
      address: address?.trim(),
      phoneNumber: phoneNumber?.trim(),
      dateOfBirth: new Date(dateOfBirth!),
      link: link?.trim(),
      job: job?.trim(),
      introduction: introduction?.trim(),
      sex: sex,
    };
    return await axiosConfig.patch(CandidateAPI.updateProfile, body, {
      headers: { "Content-Type": "application/json" },
    });
  },
};
export default candidatesService;

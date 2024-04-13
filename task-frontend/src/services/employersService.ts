import { ChangeBackground } from "@/components/modal/image";
import axiosConfig from "@/configs/axiosConfig";
import { EmployerAPI } from "@/configs/helper";

const employersService = {
  async profile() {
    return await axiosConfig.get(EmployerAPI.profile, {
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
      EmployerAPI.getList(name, status, currentPage, itemPerPage)
    );
  },
  async update(id: string, status: string) {
    const formData = new FormData();
    formData.append("status", status);
    return await axiosConfig.patch(EmployerAPI.employerById(id), formData, {
      headers: { "Content-Type": "application/octet-stream" },
    });
  },
  async delete(id: string) {
    return await axiosConfig.delete(EmployerAPI.employerById(id));
  },
  async getbyId(id: string) {
    return await axiosConfig.get(EmployerAPI.employerById(id));
  },

  async changeImage(image: File | null) {
    const formData = new FormData();
    if (image) formData.append("image", image);
    return await axiosConfig.patch(EmployerAPI.changeImage, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  async ChangeBackgroundImage(image: File | null) {
    const formData = new FormData();
    if (image) formData.append("backgroundImage", image);
    return await axiosConfig.patch(
      EmployerAPI.changeBackgroundImage,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  },

  async updateProfile(
    name?: string,
    description?: string,
    location?: string,
    businessCode?: string,
    phoneNumber?: string
  ) {
    const body = {
      name: name?.trim(),
      description: description?.trim(),
      location: location?.trim(),
      businessCode: businessCode?.trim(),
      phoneNumber: phoneNumber?.trim(),
    };
    return await axiosConfig.patch(EmployerAPI.updateProfile, body, {
      headers: { "Content-Type": "application/json" },
    });
  },
};
export default employersService;

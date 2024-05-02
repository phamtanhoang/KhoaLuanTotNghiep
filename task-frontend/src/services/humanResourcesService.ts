import axiosConfig from "@/configs/axiosConfig";
import { HumanResourceAPI } from "@/Apis";

const humanResourcesService = {
  async create(
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    sex: string,
    phoneNumber: string,
    dateOfBirth: string,
    avatar: File | null
  ) {
    const formData = new FormData();
    formData.append("username", username.trim());
    formData.append("password", password.trim());
    formData.append("firstName", firstName.trim());
    formData.append("lastName", lastName.trim());
    if (avatar) formData.append("avatar", avatar);
    formData.append("sex", sex);
    formData.append("phoneNumber", phoneNumber.trim());
    formData.append(
      "dateOfBirth",
      dateOfBirth ? `${dateOfBirth}T00:00:00` : ""
    );
    return await axiosConfig.post(HumanResourceAPI.create, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  async profile() {
    return await axiosConfig.get(HumanResourceAPI.profile, {
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
      HumanResourceAPI.getList(name, status, currentPage, itemPerPage)
    );
  },
  async update(
    id: string,
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    sex: string,
    phoneNumber: string,
    dateOfBirth: string,
    avatar: File | null,
    status: string
  ) {
    const formData = new FormData();
    formData.append("username", username.trim());
    formData.append("firstName", firstName.trim());
    formData.append("lastName", lastName.trim());
    formData.append("sex", sex);
    formData.append("phoneNumber", phoneNumber.trim());
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("status", status);
    if (password) formData.append("password", password.trim());
    if (avatar) formData.append("avatar", avatar);
    return await axiosConfig.patch(HumanResourceAPI.HRById(id), formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  async delete(id: string) {
    return await axiosConfig.delete(HumanResourceAPI.HRById(id), {
      headers: { "Content-Type": "application/json" },
    });
  },
  async getbyId(id: string) {
    return await axiosConfig.get(HumanResourceAPI.HRById(id), {
      headers: { "Content-Type": "application/json" },
    });
  },

  async updateAvatar(image: File | null) {
    const formData = new FormData();
    if (image) formData.append("avatar", image);
    return await axiosConfig.patch(HumanResourceAPI.updateAvatar, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  async updateProfile(
    firstName?: string,
    lastName?: string,
    phoneNumber?: string,
    dateOfBirth?: string,
    sex?: string
  ) {
    const body = {
      firstName: firstName?.trim(),
      lastName: lastName?.trim(),
      phoneNumber: phoneNumber?.trim(),
      dateOfBirth: new Date(dateOfBirth!),
      sex: sex,
    };
    return await axiosConfig.patch(HumanResourceAPI.updateProfile, body, {
      headers: { "Content-Type": "application/json" },
    });
  },

  async getList_Dropdown() {
    return await axiosConfig.get(HumanResourceAPI.getList_Dropdown);
  },
};
export default humanResourcesService;

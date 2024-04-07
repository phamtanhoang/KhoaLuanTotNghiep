import axiosInstance from "@/configs/axiosInstance";
import { CategoryAPI } from "@/configs/helper";

const categoriesService = {
  async getById(id: string) {
    return await axiosInstance.get(CategoryAPI.categoryById(id), {
      headers: { "Content-Type": "application/json" },
    });
  },
  async updateById(id: string, name: string, image: File) {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    return await axiosInstance.put(CategoryAPI.categoryById(id), formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  async deleteById(id: string) {
    return await axiosInstance.delete(CategoryAPI.categoryById(id), {
      headers: { "Content-Type": "application/json" },
    });
  },

  async getList(name?: string, currentPage?: number, itemPerPage?: number) {
    return await axiosInstance.get(
      CategoryAPI.getList(name, currentPage, itemPerPage)
    );
  },

  async create(name: string, image: File) {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    return await axiosInstance.post(CategoryAPI.createCategory, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
export default categoriesService;

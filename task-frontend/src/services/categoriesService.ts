import axiosConfig from "@/configs/axiosConfig";
import { CategoryAPI } from "@/configs/helper";

const categoriesService = {
  async getById(id: string) {
    return await axiosConfig.get(CategoryAPI.categoryById(id), {
      headers: { "Content-Type": "application/json" },
    });
  },
  async updateById(id: string, name: string, image: File | null) {
    const formData = new FormData();
    formData.append("name", name.trim());
    if (image) formData.append("image", image);
    return await axiosConfig.put(CategoryAPI.categoryById(id), formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  async deleteById(id: string) {
    return await axiosConfig.delete(CategoryAPI.categoryById(id), {
      headers: { "Content-Type": "application/json" },
    });
  },

  async getList(name?: string, currentPage?: number, itemPerPage?: number) {
    return await axiosConfig.get(
      CategoryAPI.getList(name?.trim(), currentPage, itemPerPage)
    );
  },

  async create(name: string, image: File) {
    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("image", image);
    return await axiosConfig.post(CategoryAPI.createCategory, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
export default categoriesService;

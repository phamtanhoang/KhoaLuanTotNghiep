import axiosInstance from "@/configs/axiosInstance";
import { TagAPI } from "@/configs/helper";

const tagsService = {
  async getById(id: string) {
    return await axiosInstance.get(TagAPI.tagById(id), {
      headers: { "Content-Type": "application/json" },
    });
  },
  async updateById(id: string, name: string, color: string) {
    const body = {
      name: name,
      color: color,
    };
    return await axiosInstance.put(TagAPI.tagById(id), body, {
      headers: { "Content-Type": "application/json" },
    });
  },
  async deleteById(id: string) {
    return await axiosInstance.delete(TagAPI.tagById(id), {
      headers: { "Content-Type": "application/json" },
    });
  },
  async getList(name?: string, currentPage?: number, itemPerPage?: number) {
    return await axiosInstance.get(
      TagAPI.getList(name, currentPage, itemPerPage)
    );
  },
  async create(name: string, color: string) {
    const body = {
      name: name,
      color: color,
    };
    return await axiosInstance.post(TagAPI.createTag, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  //   async updateById(id: string) {
  //     return await axiosInstance.put(`${TagAPI.tagUrl}/${id}`, {
  //       headers: { "Content-Type": "application/json" },
  //     });
  //   },
  //   async deleteById(id: string) {
  //     return await axiosInstance.delete(`${TagAPI.tagUrl}/${id}`, {
  //       headers: { "Content-Type": "application/json" },
  //     });
  //   },
};
export default tagsService;

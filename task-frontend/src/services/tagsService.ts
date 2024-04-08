import axiosConfig from "@/configs/axiosConfig";
import { TagAPI } from "@/configs/helper";

const tagsService = {
  async getById(id: string) {
    return await axiosConfig.get(TagAPI.tagById(id), {
      headers: { "Content-Type": "application/json" },
    });
  },
  async updateById(id: string, name: string, color: string) {
    const body = {
      name: name.trim(),
      color: color.trim(),
    };
    return await axiosConfig.put(TagAPI.tagById(id), body, {
      headers: { "Content-Type": "application/json" },
    });
  },
  async deleteById(id: string) {
    return await axiosConfig.delete(TagAPI.tagById(id), {
      headers: { "Content-Type": "application/json" },
    });
  },
  async getList(name?: string, currentPage?: number, itemPerPage?: number) {
    return await axiosConfig.get(
      TagAPI.getList(name?.trim(), currentPage, itemPerPage)
    );
  },
  async create(name: string, color: string) {
    const body = {
      name: name.trim(),
      color: color.trim(),
    };
    return await axiosConfig.post(TagAPI.createTag, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  //   async updateById(id: string) {
  //     return await axiosConfig.put(`${TagAPI.tagUrl}/${id}`, {
  //       headers: { "Content-Type": "application/json" },
  //     });
  //   },
  //   async deleteById(id: string) {
  //     return await axiosConfig.delete(`${TagAPI.tagUrl}/${id}`, {
  //       headers: { "Content-Type": "application/json" },
  //     });
  //   },
};
export default tagsService;

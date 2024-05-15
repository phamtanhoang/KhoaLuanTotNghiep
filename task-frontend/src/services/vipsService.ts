import { VipAPI } from "@/Apis";
import axiosConfig from "@/configs/axiosConfig";

const vipsService = {
  async getById(id: string) {
    return await axiosConfig.get(VipAPI.vipById(id));
  },
  async getById_Employer(id: string) {
    return await axiosConfig.get(VipAPI.getById_Employer(id));
  },
  async updateById(
    id: string,
    name?: string,
    month?: number,
    price?: number,
    color?: string,
    status?: string,
    description?: string
  ) {
    const body = {
      name: name?.trim(),
      month: month,
      price: price,
      color: color?.trim(),
      status: status?.trim(),
      description: description?.trim(),
    };
    return await axiosConfig.put(VipAPI.vipById(id), body, {
      headers: { "Content-Type": "application/json" },
    });
  },
  async deleteById(id: string) {
    return await axiosConfig.delete(VipAPI.vipById(id), {
      headers: { "Content-Type": "application/json" },
    });
  },
  async pay(id: string, bank: string) {
    return await axiosConfig.get(VipAPI.pay(id, bank), {
      headers: { "Content-Type": "application/json" },
    });
  },

  async getListByAdmin(
    name?: string,
    status?: string,
    currentPage?: number,
    itemPerPage?: number
  ) {
    return await axiosConfig.get(
      VipAPI.getListByAdmin(
        name?.trim(),
        status?.trim(),
        currentPage,
        itemPerPage
      )
    );
  },
  async getListByEmployer() {
    return await axiosConfig.get(VipAPI.getListByEmployer());
  },

  async create(
    name?: string,
    month?: number,
    price?: number,
    color?: string,
    description?: string
  ) {
    const body = {
      name: name?.trim(),
      month: month,
      price: price,
      color: color?.trim(),
      description: description?.trim(),
    };
    return await axiosConfig.post(VipAPI.base, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  async getTrasaction_Admin(
    name?: string,
    currentPage?: number,
    itemPerPage?: number
  ) {
    return await axiosConfig.get(
      VipAPI.getTrasactions_admin(name?.trim(), currentPage, itemPerPage)
    );
  },
  async getTrasactionDetail_Admin(id: string) {
    return await axiosConfig.get(VipAPI.getTrasactionDetail_admin(id));
  },
  async getTrasaction_Employer(
    name?: string,
    currentPage?: number,
    itemPerPage?: number
  ) {
    return await axiosConfig.get(
      VipAPI.getTrasactions_employer(name, currentPage, itemPerPage)
    );
  },
  async getTrasactionDetail_Employer(id: string) {
    return await axiosConfig.get(VipAPI.getTrasactionDetail_employer(id));
  },
};
export default vipsService;

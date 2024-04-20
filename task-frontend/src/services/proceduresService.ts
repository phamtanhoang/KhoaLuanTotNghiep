import axiosConfig from "@/configs/axiosConfig";
import { ProcedureAPI } from "@/configs/apis";

const proceduresService = {
  async getList(name?: string, currentPage?: number, itemPerPage?: number) {
    return await axiosConfig.get(
      ProcedureAPI.getList(name?.trim(), currentPage, itemPerPage)
    );
  },
  async create(name: string, description: string, steps: StepModel[]) {
    const body = {
      name: name,
      description: description,
      steps: steps,
    };
    return await axiosConfig.post(ProcedureAPI.create, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  async getById(id: string) {
    return await axiosConfig.get(ProcedureAPI.procedureById(id), {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  async updateById(
    id: string,
    name: string,
    description: string,
    steps: StepModel[]
  ) {
    const body = {
      name: name,
      description: description,
      steps: steps,
    };
    return await axiosConfig.patch(ProcedureAPI.procedureById(id), body, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  async delete(id: string) {
    return await axiosConfig.delete(ProcedureAPI.procedureById(id), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
export default proceduresService;

import { DataConstants } from "../constants/dataConstants";

const findJobStateById = (id: string) => {
  return DataConstants.JOB_STATE_DATA.find((state: any) => state.id === id);
};

const findApplicationStateById = (id: string) => {
  return DataConstants.APPLY_STATE_DATA.find((state: any) => state.id === id);
};
const findHRStateById = (id: string) => {
  return DataConstants.HR_STATE_DATA.find((state: any) => state.id === id);
};

export const StateHelper = {
  findJobStateById,
  findApplicationStateById,
  findHRStateById,
};

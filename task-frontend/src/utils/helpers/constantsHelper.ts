import { DataConstants } from "../constants/dataConstants";

const findJobStateById = (id?: string) => {
  return DataConstants.JOB_STATE_DROPDOWN.find((state: any) => state.id === id);
};

const findApplicationStateById = (id?: string) => {
  return DataConstants.APPLY_STATE_DROPDOWN.find(
    (state: any) => state.id === id
  );
};
const findHRStateById = (id?: string) => {
  return DataConstants.HR_STATE_DROPDOWN.find((state: any) => state.id === id);
};
const findSexById = (id?: string) => {
  return DataConstants.SEX_DATA_DROPDOWN.find((state: any) => state.id === id);
};

export const ConstantsHelper = {
  findJobStateById,
  findApplicationStateById,
  findHRStateById,
  findSexById,
};

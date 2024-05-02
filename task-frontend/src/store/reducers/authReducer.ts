import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const authReducer = createSlice({
  name: "authReducer",

  initialState: {
    currentCandidate: null as CandidateModel | null,
    currentEmployer: null as EmployerModel | null,
    currentHumanResource: null as HumanResourceModel | null,
  },

  reducers: {
    ONCHANGE_CURRENT_CANDIDATE: (
      state,
      action: PayloadAction<CandidateModel>
    ) => {
      state.currentCandidate = action.payload;
    },
    ONCHANGE_CURRENT_EMPLOYER: (
      state,
      action: PayloadAction<EmployerModel>
    ) => {
      state.currentEmployer = action.payload;
    },
    ONCHANGE_CURRENT_HUMANRESOURCE: (
      state,
      action: PayloadAction<HumanResourceModel>
    ) => {
      state.currentHumanResource = action.payload;
    },
    CLEAR_AUTH_DATA: (state) => {
      state.currentCandidate = null;
      state.currentEmployer = null;
      state.currentHumanResource = null;
    },
  },
});

export const {
  ONCHANGE_CURRENT_CANDIDATE,
  ONCHANGE_CURRENT_EMPLOYER,
  ONCHANGE_CURRENT_HUMANRESOURCE,
  CLEAR_AUTH_DATA,
} = authReducer.actions;

export default authReducer.reducer;

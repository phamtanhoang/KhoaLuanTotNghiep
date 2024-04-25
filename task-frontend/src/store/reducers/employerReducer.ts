import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const employerReducer = createSlice({
  name: "employerReducer",

  initialState: {
    currentEmployer: null as EmployerModel | null,
    currentHR: null as HumanResourceModel | null,
  },

  reducers: {
    ONCHANGE_CURRENT_EMPLOYER: (
      state,
      action: PayloadAction<EmployerModel>
    ) => {
      state.currentEmployer = action.payload;
    },
    ONCHANGE_CURRENT_HR: (state, action: PayloadAction<HumanResourceModel>) => {
      state.currentHR = action.payload;
    },
    CLEAR_CURRENT_EMPLOYER: (state) => {
      state.currentEmployer = null;
      state.currentHR = null;
    },
  },
});

export const {
  ONCHANGE_CURRENT_EMPLOYER,
  CLEAR_CURRENT_EMPLOYER,
  ONCHANGE_CURRENT_HR,
} = employerReducer.actions;

export default employerReducer.reducer;

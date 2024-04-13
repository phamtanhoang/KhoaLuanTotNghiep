import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const employerReducer = createSlice({
  name: "employerReducer",

  initialState: {
    currentEmployer: null as EmployerModel | null,
  },

  reducers: {
    ONCHANGE_CURRENT_EMPLOYER: (
      state,
      action: PayloadAction<EmployerModel>
    ) => {
      state.currentEmployer = action.payload;
    },
    CLEAR_CURRENT_EMPLOYER: (state) => {
      state.currentEmployer = null;
    },
  },
});

export const { ONCHANGE_CURRENT_EMPLOYER, CLEAR_CURRENT_EMPLOYER } =
  employerReducer.actions;

export default employerReducer.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const scheduleReducer = createSlice({
  name: "scheduleReducer",

  initialState: {
    monthIndex: new Date().getMonth(),
  },

  reducers: {
    ONCHANGE_MONTH: (state, action) => {
      state.monthIndex = action.payload;
    },
  },
});

export const { ONCHANGE_MONTH } = scheduleReducer.actions;

export default scheduleReducer.reducer;

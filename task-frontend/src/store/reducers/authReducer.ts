import { createSlice } from "@reduxjs/toolkit";

export const authReducer = createSlice({
  name: "authReducer",

  initialState: {
    info: null,
    role: "",
  },

  reducers: {
    ONCHANGE_INFO: (state, action) => {
      state.info = action.payload;
    },
    ONCHANGE_ROLE: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { ONCHANGE_ROLE, ONCHANGE_INFO } = authReducer.actions;

export default authReducer.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const searchReducer = createSlice({
  name: "searchReducer",

  initialState: {
    keyword: "",
    status: "",
  },

  reducers: {
    ONCHANGE_KEYWORD: (state, action) => {
      state.keyword = action.payload;
    },
    ONCHANGE_STATUS: (state, action) => {
      state.status = action.payload;
    },
    ONCLEAR_FILTER: (state) => {
      state.keyword = "";
      state.status = "";
    },
  },
});

export const { ONCHANGE_KEYWORD, ONCHANGE_STATUS, ONCLEAR_FILTER } =
  searchReducer.actions;

export default searchReducer.reducer;

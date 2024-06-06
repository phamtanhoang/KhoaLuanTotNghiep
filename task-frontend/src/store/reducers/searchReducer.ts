import { createSlice } from "@reduxjs/toolkit";

export const searchReducer = createSlice({
  name: "searchReducer",

  initialState: {
    keyword: "",
    category: "",
    status: "",
    isExpired: false,
  },

  reducers: {
    ONCHANGE_KEYWORD: (state, action) => {
      state.keyword = action.payload;
    },
    ONCHANGE_STATUS: (state, action) => {
      state.status = action.payload;
    },
    ONCHANGE_CATEGORY: (state, action) => {
      state.category = action.payload;
    },
    ONCHANGE_ISEXPIRED: (state, action) => {
      state.isExpired = action.payload;
    },
    ONCLEAR_FILTER: (state) => {
      state.keyword = "";
      state.category = "";
      state.status = "";
      state.isExpired = false;
    },
  },
});

export const {
  ONCHANGE_KEYWORD,
  ONCHANGE_STATUS,
  ONCHANGE_CATEGORY,
  ONCLEAR_FILTER,
  ONCHANGE_ISEXPIRED,
} = searchReducer.actions;

export default searchReducer.reducer;

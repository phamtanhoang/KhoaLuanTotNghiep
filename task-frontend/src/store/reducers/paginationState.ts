import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PaginationState {
  isFirstPage: boolean;
  isLastPage: boolean;
  totalElements: number;
  totalPages: number;
  itemPerPage: number;
  currentPage: number;
  numberOfElements: number;
  isEmpty: boolean;
}

const initialState: PaginationState = {
  isFirstPage: false,
  isLastPage: false,
  totalElements: 0,
  totalPages: 0,
  itemPerPage: 10,
  currentPage: 1,
  numberOfElements: 0,
  isEmpty: true,
};
export const paginationReducer = createSlice({
  name: "paginationReducer",

  initialState,

  reducers: {
    ONCHANGE_PAGINATION: (state, action: PayloadAction<any>) => {
      if (action.payload) {
        state.isFirstPage = action.payload.first;
        state.isLastPage = action.payload.last;
        state.totalElements = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
        state.numberOfElements = action.payload.numberOfElements;
        state.isEmpty = action.payload.empty;
      } else {
        state.isFirstPage = initialState.isFirstPage;
        state.isLastPage = initialState.isLastPage;
        state.totalElements = initialState.totalElements;
        state.totalPages = initialState.totalPages;
        state.itemPerPage = initialState.itemPerPage;
        state.currentPage = initialState.currentPage;
        state.numberOfElements = initialState.numberOfElements;
        state.isEmpty = initialState.isEmpty;
      }
    },
    CLEAR_PAGINATION_STATE: (state) => {
      state.isFirstPage = initialState.isFirstPage;
      state.isLastPage = initialState.isLastPage;
      state.totalElements = initialState.totalElements;
      state.totalPages = initialState.totalPages;
      state.itemPerPage = initialState.itemPerPage;
      state.currentPage = initialState.currentPage;
      state.numberOfElements = initialState.numberOfElements;
      state.isEmpty = initialState.isEmpty;
    },
    ONCHANGE_ITEMPERPAGE: (state, action: PayloadAction<number>) => {
      state.itemPerPage = action.payload;
    },
    ONCHANGE_CURRENTPAGE: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  ONCHANGE_PAGINATION,
  CLEAR_PAGINATION_STATE,
  ONCHANGE_ITEMPERPAGE,
  ONCHANGE_CURRENTPAGE,
} = paginationReducer.actions;

export default paginationReducer.reducer;

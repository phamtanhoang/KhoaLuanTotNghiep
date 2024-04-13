import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const candidateReducer = createSlice({
  name: "candidateReducer",

  initialState: {
    currentCandidate: null as CandidateModel | null,
  },

  reducers: {
    ONCHANGE_CURRENT_CANDIDATE: (
      state,
      action: PayloadAction<CandidateModel>
    ) => {
      state.currentCandidate = action.payload;
    },
    CLEAR_CURRENT_CANDIDATE: (state) => {
      state.currentCandidate = null;
    },
  },
});

export const { ONCHANGE_CURRENT_CANDIDATE, CLEAR_CURRENT_CANDIDATE } =
  candidateReducer.actions;

export default candidateReducer.reducer;

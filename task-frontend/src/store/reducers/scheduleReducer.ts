import { DateHelper } from "@/utils/helpers";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const scheduleReducer = createSlice({
  name: "scheduleReducer",

  initialState: {
    eventList: [],
    fromDate: DateHelper.getFirstDayOfMonth(),
    toDate: DateHelper.getLastDayOfMonth(),
    view: "month",
  },

  reducers: {
    ONCHANGE_FROMDATE: (state: any, actions: PayloadAction<any>) => {
      state.fromDate = actions.payload;
    },
    ONCHANGE_TODATE: (state: any, actions: PayloadAction<any>) => {
      state.toDate = actions.payload;
    },
    ONCHANGE_VIEW: (state: any, actions: PayloadAction<any>) => {
      state.view = actions.payload;
    },
    ONLOAD_EVENTLIST: (state: any, actions: PayloadAction<any>) => {
      state.eventList = actions.payload;
    },
    ON_ADD_EVENT: (state: any, action: PayloadAction<any>) => {
      state.eventList.push(action.payload);
    },
  },
});

export const {
  ONLOAD_EVENTLIST,
  ON_ADD_EVENT,
  ONCHANGE_FROMDATE,
  ONCHANGE_TODATE,
  ONCHANGE_VIEW,
} = scheduleReducer.actions;

export default scheduleReducer.reducer;

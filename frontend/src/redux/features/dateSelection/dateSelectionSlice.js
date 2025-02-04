import { createSlice } from "@reduxjs/toolkit";
import { startOfWeek, addDays, format } from "date-fns";

// Get the current date
const currentDate = new Date();

// Calculate the current week's Sunday date
const currentWeekSunday = startOfWeek(currentDate, { weekStartsOn: 0 });
const formattedCurrentWeekSunday = format(currentWeekSunday, "yyyy-MM-dd");

// Calculate the current week's Thursday date
const currentWeekThursday = addDays(currentWeekSunday, 4);
const formattedCurrentWeekThursday = format(currentWeekThursday, "yyyy-MM-dd");

// Create a slice for date selection with default dates set to the current week's Sunday and Thursday
const dateSelectionSlice = createSlice({
  name: "dateSelection",
  initialState: {
    startDate: formattedCurrentWeekSunday,
    endDate: formattedCurrentWeekThursday,
  },
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
  },
});

export const { setStartDate, setEndDate } = dateSelectionSlice.actions;

export default dateSelectionSlice.reducer;

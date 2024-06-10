import { configureStore } from "@reduxjs/toolkit";
import dateSelectionReducer from "./features/dateSelection/dateSelectionSlice";
import ticketsReducer from "./features/tickets/ticketsSlice";
import tasksReducer from "./features/tasks/tasksSlice";

export const store = configureStore({
  reducer: {
    dateSelection: dateSelectionReducer,
    tickets: ticketsReducer,
    tasks: tasksReducer,
  },
});

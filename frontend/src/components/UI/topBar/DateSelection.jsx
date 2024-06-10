import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setStartDate, setEndDate } from "../../../redux/features/dateSelection/dateSelectionSlice";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import styles from "./DateSelection.module.css";

// DateSelection component is used to set the date range for displaying tickets in the application
export default function DateSelection() {
  const dispatch = useDispatch();
  const { startDate, endDate } = useSelector((state) => state.dateSelection);

  // Handle setting the start date
  const handleSetStartDate = (date) => {
    dispatch(setStartDate(date.toISOString().substring(0, 10)));
  };

  // Handle setting the end date
  const handleSetEndDate = (date) => {
    dispatch(setEndDate(date.toISOString().substring(0, 10)));
  };

  return (
    <div className="d-flex justify-content-start gap-2 me-2">
      <p>Dates:</p>
      <DatePicker
        selected={new Date(startDate)}
        onChange={handleSetStartDate}
        dateFormat="dd/MM/yyyy"
        className={`form-control ${styles.datePicker}`}
      />
      <span>-</span>
      <DatePicker
        selected={new Date(endDate)}
        onChange={handleSetEndDate}
        dateFormat="dd/MM/yyyy"
        className={`form-control ${styles.datePicker}`}
      />
    </div>
  );
}

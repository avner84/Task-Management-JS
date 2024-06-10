// src/components/TopBar.jsx
import React from "react";
import DateSelection from "./DateSelection";
import NewTaskButton from './NewTicketButton'

const TopBar = () => {
  return (
    <div className="container d-flex content-start gap-5">
      <DateSelection />
      <NewTaskButton/>
    </div>
  );
};

export default TopBar;

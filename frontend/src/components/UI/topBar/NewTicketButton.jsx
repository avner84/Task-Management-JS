import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import CustomModal from "../modal/CustomModal";
import TicketForm from "../forms/TicketForm";
import useAddTicket from "../../../hooks/tickets/useAddTicket";

// Add ticket or bug button
export default function NewTicketButton() {
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState("");
  const { resetStatus } = useAddTicket(formType);

   // Handle closing the modal
   const handleClose = () => {
    resetStatus();
    setShowModal(false);
  };

  // Handle showing the modal with the specified form type
  const handleShow = (type) => {
    setFormType(type);
    setShowModal(true);
  };

  return (
    <>
      <DropdownButton id="dropdown-basic-button" title="Add a new">
        <Dropdown.Item
          className="text-primary"
          onClick={() => handleShow("Ticket")}
        >
          Ticket
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          className="text-danger"
          onClick={() => handleShow("Bug")}
        >
          Bug
        </Dropdown.Item>
      </DropdownButton>

      <CustomModal
        show={showModal}
        handleClose={handleClose}
        title={`Create a new ${formType}`}
      >
        <TicketForm formType={formType} isEditMode={false} />
      </CustomModal>
    </>
  );
}

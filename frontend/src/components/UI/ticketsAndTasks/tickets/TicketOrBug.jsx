import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Trash } from "react-bootstrap-icons";
import styles from "./TicketOrBug.module.css";
import useDeleteTicket from '../../../../hooks/tickets/useDeleteTicket';
import useAddTask from '../../../../hooks/tasks/useAddTask';
import useUpdateTicket from '../../../../hooks/tickets/useUpdateTicket';
import FloatingAlert from '../../alerts/FloatingAlert';
import CustomModal from "../../modal/CustomModal";
import TicketForm from "../../forms/TicketForm";
import TaskForm from "../../forms/TaskForm";
import { format, parseISO } from "date-fns";

// TicketOrBug is a component representing a ticket that contains tasks.
// The ticket can be either defined as a Ticket or a Bug.
// Clicking on it opens a modal that allows editing or adding tasks.
export default function TicketOrBug({
  id,
  title,
  description,
  owner,
  dueDate,
  status,
  priority,
  type,
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalFormType, setModalFormType] = useState("");

  const { deleteTicketError, deleteTicket } = useDeleteTicket();
  const { resetStatus: resetAddTaskStatus } = useAddTask();
  const { resetStatus: resetUpdateTicketStatus } = useUpdateTicket();

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const handleDelete = () => {
    deleteTicket(id);
  };

  const handleShow = (formType) => {
    setModalFormType(formType);
    setShowModal(true);
  };

  const handleClose = () => {
    if (modalFormType === "Ticket") {
      resetUpdateTicketStatus();
    } else {
      resetAddTaskStatus();
    }
    setShowModal(false);
  };

  const parseISOdueDate = parseISO(dueDate);
  const formattedDueDate = format(parseISOdueDate, "yyyy-MM-dd"); // Format date to match the HTML date input

  const FormComponent = modalFormType === "Ticket" ? TicketForm : TaskForm;
  const initialValues = modalFormType === "Ticket" 
    ? { id, title, description, owner, dueDate: formattedDueDate, status, priority }
    : { title: "", description: "", owner: "", status: "", ticketId: id };

  return (
    <>
      {deleteTicketError && <FloatingAlert message={deleteTicketError} duration="3000" />}
      <Card
        className={`${type === "ticket" ? styles.ticketType : styles.bugType}`}
      >
        {!isDeleting ? (
          <>
            <Card.Body onClick={() => handleShow("Ticket")} role="button">
              <Card.Title>{title}</Card.Title>
              <Card.Text>{description}</Card.Text>
              <Card.Subtitle className="mb-2 mt-3">Owner: {owner}</Card.Subtitle>
              <Card.Subtitle className="mb-2 mt-1">
                Due date: {format(parseISO(dueDate), "dd.MM.yyyy")}
              </Card.Subtitle>
              <Card.Subtitle className="mb-2 mt-1">
                Status: {status}
              </Card.Subtitle>
              <Card.Subtitle className="mb-2 mt-1">
                Priority: {priority}
              </Card.Subtitle>
            </Card.Body>
            <Card.Footer className="text-muted d-flex justify-content-between">
              <Button
                variant={type === "ticket" ? "primary" : "danger"}
                onClick={() => handleShow("Task")}
              >
                Add a Task
              </Button>
              <div
                className={`mt-1 ${styles.trashIcon}`}
                onClick={() => { setIsDeleting(true) }}
              >
                <Trash role="button" size={25} />
              </div>
            </Card.Footer>
          </>
        ) : (
          <Card.Body className="mt-2 mb-2">
            <Card.Subtitle className="mb-2 mt-3">
              Are you sure you want to delete this {type}?
            </Card.Subtitle>
            <div className="mt-3 d-flex justify-content-center gap-4">
              <Button variant="danger" onClick={handleDelete}>
                Yes
              </Button>
              <Button variant="secondary" onClick={() => { setIsDeleting(false) }}>
                No
              </Button>
            </div>
          </Card.Body>
        )}
      </Card>

      <CustomModal
        show={showModal}
        handleClose={handleClose}
        title={modalFormType === "Ticket" ? `Edit ${capitalizeFirstLetter(type)}` : "Add Task"}
      >
        <FormComponent formType={type} initialValues={initialValues} isEditMode={modalFormType === "Ticket"} />
      </CustomModal>
    </>
  );
}

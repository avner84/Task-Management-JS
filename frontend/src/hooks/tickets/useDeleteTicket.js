import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteTicket, resetDeleteTicketStatus } from '../../redux/features/tickets/ticketsSlice';

// Custom hook for deleting a ticket
const useDeleteTicket = () => {
  const dispatch = useDispatch();
  const { deleteTicketStatus, deleteTicketError } = useSelector((state) => state.tickets);

  // Function to dispatch deleteTicket action
  const deleteTicketHandler = (id) => {
    dispatch(deleteTicket(id));
  };

  useEffect(() => {
    // Reset the delete ticket status after a successful deletion
    if (deleteTicketStatus === 'succeeded') {
      dispatch(resetDeleteTicketStatus());
    }
  }, [deleteTicketStatus, dispatch]);

 
  return { deleteTicketStatus, deleteTicketError, deleteTicket: deleteTicketHandler };
};

export default useDeleteTicket;

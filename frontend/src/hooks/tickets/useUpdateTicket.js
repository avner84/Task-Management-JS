import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { updateTicket, resetUpdateTicketStatus } from '../../redux/features/tickets/ticketsSlice';

// Custom hook for updating a ticket
const useUpdateTicket = () => {
  const dispatch = useDispatch();
  const { updateTicketStatus, updateTicketError } = useSelector((state) => state.tickets);

  // Function to dispatch updateTicket action
  const updateTicketHandler = (id, updateData) => {
    dispatch(updateTicket({ id, updateData }));
  };

  // Reset the update ticket status after a successful update
  useEffect(() => {
    if (updateTicketStatus === 'succeeded') {
      dispatch(resetUpdateTicketStatus());
    }
  }, [updateTicketStatus, dispatch]);

  // Function to reset the update ticket status
  const resetStatus = () => {
    dispatch(resetUpdateTicketStatus());
  };

 
  return { updateTicketStatus, updateTicketError, updateTicket: updateTicketHandler, resetStatus };
};

export default useUpdateTicket;

import { useDispatch, useSelector } from 'react-redux';
import { addTicket, resetAddTicketStatus } from '../../redux/features/tickets/ticketsSlice';

// Custom hook for adding a ticket
const useAddTicket = (formType) => {
  const dispatch = useDispatch();
  const { addTicketStatus, addTicketError } = useSelector((state) => state.tickets);

  // Function to dispatch addTicket action with form data and type
  const addTicketHandler = (formData) => {
    const dataToSend = { ...formData, type: formType.toLowerCase() };
    dispatch(addTicket(dataToSend));
  };

    // Function to reset the add ticket status
  const resetStatus = () => {
    dispatch(resetAddTicketStatus());
  };

  return { addTicketStatus, addTicketError, addTicket: addTicketHandler, resetStatus };
};

export default useAddTicket;

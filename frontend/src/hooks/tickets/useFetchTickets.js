import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTickets, resetAddTicketStatus } from '../../redux/features/tickets/ticketsSlice';

// Custom hook for fetching tickets
const useFetchTickets = () => {
  const dispatch = useDispatch();
  const { startDate, endDate } = useSelector((state) => state.dateSelection);
  const ticketsState = useSelector((state) => state.tickets);

    // Fetch tickets when startDate or endDate changes
  useEffect(() => {
    if (startDate && endDate) {
      dispatch(fetchTickets({ startDate, endDate }));
    }
  }, [startDate, endDate, dispatch]);

  // Refetch tickets and reset addTicket status after a new ticket is successfully added
  useEffect(() => {
    if (ticketsState.addTicketStatus === 'succeeded') {
      dispatch(fetchTickets({ startDate, endDate }));
      dispatch(resetAddTicketStatus());
    }
  }, [ticketsState.addTicketStatus, startDate, endDate, dispatch]);

  // Return the tickets state
  return ticketsState;
};

export default useFetchTickets;

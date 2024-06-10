const {
  createNewTicket,
  findTicketsByDate,
  updateTicket,
  deleteTicket,
} = require("../data-access/tickets");

// Controller to create a new ticket
const createNewTicketController = async (req, res) => {
  const data = req.body;

  try {
    const result = await createNewTicket(data);
    res
      .status(201)
      .json({ message: `${data.type} created!`, ticket: result._id });
  } catch (err) {
    console.log("err :", err);
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

// Controller to find tickets by date range
const findTicketsByDateController = async (req, res) => {
  const { startDate, endDate } = req.body;

  try {
    const tickets = await findTicketsByDate({
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });
    if (tickets.length > 0) {
      res.status(200).json({
        message: `Found ${tickets.length} tickets between ${startDate} and ${endDate}.`,
        tickets,
      });
    } else {
      res
        .status(404)
        .json({ error: "No tickets found for the specified date range." });
    }
  } catch (err) {
    console.log("err :", err);
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

// Controller to update a ticket by ID
const updateTicketController = async (req, res) => {
  const { ticketId, updateData } = req.body;
  console.log("ticketId :", ticketId);

  try {
    const updatedTicket = await updateTicket(ticketId, updateData);
    if (updatedTicket) {
      res.status(200).json({
        message: `Ticket with ID "${ticketId}" updated successfully.`,
        ticket: updatedTicket,
      });
    } else {
      res
        .status(404)
        .json({ error: `Ticket with ID ${ticketId} not found.` });
    }
  } catch (error) {
    console.log("err:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

// Controller to delete a ticket by ID
const deleteTicketController = async (req, res) => {
  const ticketId = req.params.ticketId;
  try {
    const wasDeleted = await deleteTicket(ticketId);
    if (wasDeleted) {
      res.status(200).json({
        message: `Ticket with ID "${ticketId}" deleted successfully.`,
      });
    } else {
      res
        .status(404)
        .json({ error: `Ticket with ID ${ticketId} not found.` });
    }
  } catch (error) {
    console.log("err:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

module.exports = {
  createNewTicketController,
  findTicketsByDateController,
  updateTicketController,
  deleteTicketController,
};

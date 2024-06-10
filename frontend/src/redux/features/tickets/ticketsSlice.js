import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../../config/default";

const { API_URL } = config;

// Async thunk for fetching tickets
// This thunk fetches tickets from the server based on start and end dates.
export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/tickets/get-tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ startDate, endDate }),
      });

      const data = await response.json();
      if (response.ok) {
        return data.tickets;
      } else if (response.status === 404) {
        return [];
      } else {
        return rejectWithValue(data.error || "Failed to fetch tickets");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for adding a ticket
// This thunk adds a new ticket to the server.
export const addTicket = createAsyncThunk(
  "tickets/addTicket",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/tickets/create-ticket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        return data.ticket;
      } else {
        return rejectWithValue(data.error || "Failed to create ticket");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating a ticket
// This thunk updates an existing ticket on the server.
export const updateTicket = createAsyncThunk(
  "tickets/updateTicket",
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/tickets/update-ticket`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ticketId: id, updateData }),
      });

      const data = await response.json();
      if (response.ok) {
        return data.ticket;
      } else {
        return rejectWithValue(data.error || "Failed to update ticket");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for deleting a ticket
// This thunk deletes a ticket from the server.
export const deleteTicket = createAsyncThunk(
  "tickets/deleteTicket",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/tickets/delete-ticket/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        return id;
      } else {
        const data = await response.json();
        return rejectWithValue(data.error || "Failed to delete ticket");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ticketsSlice = createSlice({
  name: "tickets",
  initialState: {
    tickets: [],
    fetchTicketsStatus: "idle",
    addTicketStatus: "idle",
    updateTicketStatus: "idle",
    deleteTicketStatus: "idle",
    fetchTicketsError: null,
    addTicketError: null,
    updateTicketError: null,
    deleteTicketError: null,
  },
  reducers: {
    resetFetchTicketsStatus: (state) => {
      state.fetchTicketsStatus = "idle";
      state.fetchTicketsError = null;
    },
    resetAddTicketStatus: (state) => {
      state.addTicketStatus = "idle";
      state.addTicketError = null;
    },
    resetUpdateTicketStatus: (state) => {
      state.updateTicketStatus = "idle";
      state.updateTicketError = null;
    },
    resetDeleteTicketStatus: (state) => {
      state.deleteTicketStatus = "idle";
      state.deleteTicketError = null;
    },
    addTaskToTicket: (state, action) => {
      const { ticketId, task } = action.payload;
      console.log('task :', task);
      const ticket = state.tickets.find((ticket) => ticket._id === ticketId);
      if (ticket) {
        ticket.tasks = ticket.tasks || []; // Initialize tasks array if it's not already initialized
        ticket.tasks.push(task);
      }
    },
    // Reducers for managing tasks within tickets
    // Since tasks are stored as an array within each ticket, 
    // the reducers that perform updates to tasks in the state are here in ticketsSlice, not in a separate tasksSlice.
    updateTaskInTicket: (state, action) => {
      const { taskId, task } = action.payload;
      const ticket = state.tickets.find((ticket) =>
        ticket.tasks.some((t) => t._id === taskId)
      );
      if (ticket) {
        const taskIndex = ticket.tasks.findIndex((t) => t._id === taskId);
        if (taskIndex !== -1) {
          ticket.tasks[taskIndex] = task;
        }
      }
    },
    updateTaskStatusInTicket: (state, action) => {
      const { taskId, status } = action.payload;
      const ticket = state.tickets.find((ticket) =>
        ticket.tasks.some((t) => t._id === taskId)
      );
      if (ticket) {
        const task = ticket.tasks.find((t) => t._id === taskId);
        if (task) {
          task.status = status;
        }
      }
    },
    deleteTaskFromTicket: (state, action) => {
      const { taskId } = action.payload;
      const ticket = state.tickets.find((ticket) =>
        ticket.tasks.some((t) => t._id === taskId)
      );
      if (ticket) {
        ticket.tasks = ticket.tasks.filter((task) => task._id !== taskId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.fetchTicketsStatus = "loading";
        state.fetchTicketsError = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.fetchTicketsStatus = "succeeded";
        state.tickets = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.fetchTicketsStatus = "failed";
        state.fetchTicketsError = action.payload;
      })
      .addCase(addTicket.pending, (state) => {
        state.addTicketStatus = "loading";
        state.addTicketError = null;
      })
      .addCase(addTicket.fulfilled, (state) => {
        state.addTicketStatus = "succeeded";
      })
      .addCase(addTicket.rejected, (state, action) => {
        state.addTicketStatus = "failed";
        state.addTicketError = action.payload;
      })
      .addCase(updateTicket.pending, (state) => {
        state.updateTicketStatus = "loading";
        state.updateTicketError = null;
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        state.updateTicketStatus = "succeeded";
        const index = state.tickets.findIndex(
          (ticket) => ticket._id === action.payload._id
        );
        if (index !== -1) {
          state.tickets[index] = action.payload;
        }
       // Sort the array by date (relevant in case the user edited the ticket's date)
        state.tickets.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      })
      .addCase(updateTicket.rejected, (state, action) => {
        state.updateTicketStatus = "failed";
        state.updateTicketError = action.payload;
      })
      .addCase(deleteTicket.pending, (state) => {
        state.deleteTicketStatus = "loading";
        state.deleteTicketError = null;
      })
      .addCase(deleteTicket.fulfilled, (state, action) => {
        state.deleteTicketStatus = "succeeded";
        state.tickets = state.tickets.filter(
          (ticket) => ticket._id !== action.payload
        );
      })
      .addCase(deleteTicket.rejected, (state, action) => {
        state.deleteTicketStatus = "failed";
        state.deleteTicketError = action.payload;
      });
  },
});

export const {
  resetFetchTicketsStatus,
  resetAddTicketStatus,
  resetUpdateTicketStatus,
  resetDeleteTicketStatus,
  addTaskToTicket,
  updateTaskInTicket,
  updateTaskStatusInTicket,
  deleteTaskFromTicket,
} = ticketsSlice.actions;
export default ticketsSlice.reducer;

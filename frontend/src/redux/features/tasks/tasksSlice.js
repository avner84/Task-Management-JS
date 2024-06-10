import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../../config/default";
import {
  addTaskToTicket,
  updateTaskInTicket,
  updateTaskStatusInTicket,
  deleteTaskFromTicket,
} from "../tickets/ticketsSlice";

const { API_URL } = config;

// Async thunk for adding a task
// This thunk adds a new task to the server and updates the corresponding ticket in the state.
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (formData, { dispatch, rejectWithValue }) => {
    console.log("formData :", formData);
    try {
      const response = await fetch(`${API_URL}/tasks/create-task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("data :", data);
      if (response.ok) {
        dispatch(
          addTaskToTicket({
            ticketId: formData.ticketId,
            task: { ...formData, _id: data.taskId },
          })
        );
        return data.task;
      } else {
        return rejectWithValue(data.error || "Failed to create task");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating a task
// This thunk updates an existing task on the server and updates the corresponding task in the ticket in the state.
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, updateData }, { dispatch, getState, rejectWithValue }) => {
    const state = getState();
    const ticket = state.tickets.tickets.find((ticket) =>
      ticket.tasks.some((t) => t._id === taskId)
    );
    const previousTask = ticket?.tasks.find((t) => t._id === taskId);

    // Optimistically update task status in the ticket
    dispatch(updateTaskStatusInTicket({ taskId, status: updateData.status }));

    try {
      const response = await fetch(`${API_URL}/tasks/update-task`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId, updateData }),
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(updateTaskInTicket({ taskId, task: data.task }));
        return data.task;
      } else {
        // Perform rollback in case of error
        if (previousTask) {
          dispatch(updateTaskInTicket({ taskId, task: previousTask }));
        }
        return rejectWithValue(data.error || "Failed to update task");
      }
    } catch (error) {
      // Perform rollback in case of error
      if (previousTask) {
        dispatch(updateTaskInTicket({ taskId, task: previousTask }));
      }
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for deleting a task
// This thunk deletes a task from the server and updates the corresponding ticket in the state.
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/tasks/delete-task/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        dispatch(deleteTaskFromTicket({ taskId: id }));
        return id;
      } else {
        const data = await response.json();
        return rejectWithValue(data.error || "Failed to delete task");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    addTaskStatus: "idle",
    updateTaskStatus: "idle",
    deleteTaskStatus: "idle",
    addTaskError: null,
    updateTaskError: null,
    deleteTaskError: null,
  },
  reducers: {
    resetAddTaskStatus: (state) => {
      state.addTaskStatus = "idle";
      state.addTaskError = null;
    },
    resetUpdateTaskStatus: (state) => {
      state.updateTaskStatus = "idle";
      state.updateTaskError = null;
    },
    resetDeleteTaskStatus: (state) => {
      state.deleteTaskStatus = "idle";
      state.deleteTaskError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state) => {
        state.addTaskStatus = "loading";
        state.addTaskError = null;
      })
      .addCase(addTask.fulfilled, (state) => {
        state.addTaskStatus = "succeeded";
      })
      .addCase(addTask.rejected, (state, action) => {
        state.addTaskStatus = "failed";
        state.addTaskError = action.payload;
      })
      .addCase(updateTask.pending, (state) => {
        state.updateTaskStatus = "loading";
        state.updateTaskError = null;
      })
      .addCase(updateTask.fulfilled, (state) => {
        state.updateTaskStatus = "succeeded";
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.updateTaskStatus = "failed";
        state.updateTaskError = action.payload;
      })
      .addCase(deleteTask.pending, (state) => {
        state.deleteTaskStatus = "loading";
        state.deleteTaskError = null;
      })
      .addCase(deleteTask.fulfilled, (state) => {
        state.deleteTaskStatus = "succeeded";
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.deleteTaskStatus = "failed";
        state.deleteTaskError = action.payload;
      });
  },
});

export const {
  resetAddTaskStatus,
  resetUpdateTaskStatus,
  resetDeleteTaskStatus,
} = tasksSlice.actions;
export default tasksSlice.reducer;

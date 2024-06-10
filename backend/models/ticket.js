const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: String,
      required: true,
      trim: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,      
    },
    priority: {
      type: String,
      required: true,      
    },
    type: {
      type: String,
      required: true,      
    },
  },
  { timestamps: true }
);

const TicketModel = mongoose.model("Ticket", ticketSchema);

module.exports = TicketModel;

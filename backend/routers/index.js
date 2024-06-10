const express = require("express");
const router = express.Router();

const ticketsRouter = require("./tickets");
const tasksRouter = require("./tasks");

router.use("/tickets", ticketsRouter);
router.use("/tasks", tasksRouter);

module.exports = router;

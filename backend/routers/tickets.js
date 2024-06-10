const  { Router } = require("express");

const  { createNewTicketController, findTicketsByDateController, updateTicketController, deleteTicketController } = require("../controllers/tickets");

const router = Router();

router.post("/create-ticket", createNewTicketController);

router.post("/get-tickets", findTicketsByDateController);

router.put("/update-ticket", updateTicketController);

router.delete("/delete-ticket/:ticketId", deleteTicketController)



module.exports = router;

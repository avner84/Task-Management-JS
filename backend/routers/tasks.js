const { Router } = require("express");
const { createNewTaskController, updateTaskController, deleteTaskController } = require("../controllers/tasks");

const router = Router();

router.post("/create-task", createNewTaskController);

router.put("/update-task", updateTaskController);

router.delete("/delete-task/:taskId", deleteTaskController);

module.exports = router;

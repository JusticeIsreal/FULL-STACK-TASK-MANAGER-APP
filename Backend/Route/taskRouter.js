const express = require("express");
const router = express.Router();

// IMPORT THE FUNCTIONS
const {
  deleteTasks,
  updateTasks,
  postTasks,
  getTask,
} = require("../Controller/taskController");

router.get("/:id", getTask);
router.post("/", postTasks);
router.patch("/:id", updateTasks);
router.delete("/:id", deleteTasks);

module.exports = router;

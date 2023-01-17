const express = require("express");
const router = express.Router();

// IMPORT THE FUNCTIONS
const {
  deleteTasks,
  updateTasks,
  postTasks,
} = require("../Controller/taskController");

router.post("/", postTasks);
router.patch("/:id", updateTasks);
router.delete("/:id", deleteTasks);

module.exports = router;

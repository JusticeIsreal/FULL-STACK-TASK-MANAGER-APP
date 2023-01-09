const express = require("express");
const router = express.Router();



// IMPORT THE FUNCTIONS
const {
  getAllTasks,
  deleteTasks,
  getOneTask,
  updateTasks,
  postTasks,
} = require("../Controller/taskController");

router.get("/", getAllTasks);
router.post("/", postTasks);
router.get("/:id", getOneTask);
router.patch("/:id", updateTasks);
router.delete("/:id", deleteTasks);

module.exports = router;

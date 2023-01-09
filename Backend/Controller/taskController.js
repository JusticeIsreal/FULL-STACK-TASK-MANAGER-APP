const TaskSchema = require("../models/taskSchema");

// get all task
const getAllTasks = async (req, res) => {
  try {
    let tasks = await TaskSchema.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// get single task
const getOneTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const tasks = await TaskSchema.findOne({ _id: taskID });

    if (!tasks) {
      return res.status(404).json({ msg: "Task not found" });
    }
    return res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: `no name with id ${id}` });
  }
};

// post task
const postTasks = async (req, res) => {
  try {
    let tasks = await TaskSchema.create(req.body);
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: "this task wasnt posted" });
  }
};

// update tasks by id
const updateTasks = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const tasks = await TaskSchema.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!tasks) {
      return res.status(404).json({ msg: "Task not found" });
    }
    return res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// delete task by id
const deleteTasks = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    let tasks = await TaskSchema.findOneAndDelete({ _id: taskID });
    if (!tasks) {
      return res.status(404).json({ msg: "Task not found" });
    }
    return res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: "error " });
  }
};

module.exports = {
  getAllTasks,
  getOneTask,
  postTasks,
  deleteTasks,
  updateTasks,
};

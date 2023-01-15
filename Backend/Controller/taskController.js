const TaskSchema = require("../models/taskSchema");
const UserSchema = require("../models/userSchema");
const jwt = require("jsonwebtoken");

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
  // try {
  //   let tasks = await TaskSchema.create(req.body);

  //   res.status(200).json({ tasks });
  // } catch (error) {
  //   res.status(500).json({ msg: "this task wasnt posted" });
  // }

  try {
    const body = req.body;

    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "token is required" });
    }
    const token = auth.split(" ")[1];
    const userDetails = await jwt.verify(token, process.env.SECRET);
    if (!userDetails) {
      return res.status(401).json({ msg: "token is required" });
    }

    const user = await UserSchema.findById(userDetails.id);
    if (!user) {
      res.status(401).json({ msg: "user not found" });
    }

    newTask = new TaskSchema({
      name: body.name,
      status: body.status,
      completed: body.completed,
      user: user._id,
    });
    const savedTask = await newTask.save();
    user.task.push(savedTask);
    await user.save();
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
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

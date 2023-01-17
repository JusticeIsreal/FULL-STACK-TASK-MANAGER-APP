const TaskSchema = require("../models/taskSchema");
const UserSchema = require("../models/userSchema");
const jwt = require("jsonwebtoken");

// post task
const postTasks = async (req, res) => {
  try {
    const { name, status, completed } = req.body;

    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token was not provided" });
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
      name: name,
      status: status,
      completed: completed,
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
      return res.status(401).json({ msg: "user not found" });
    }

    const task = await TaskSchema.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "task not found" });
    }

    if (!task.user.equals(user._id)) {
      return res.status(401).json({ msg: "unauthorized" });
    }

    const updatedTask = await TaskSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ updatedTask });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// delete task by id
const deleteTasks = async (req, res) => {
  try {
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
      return res.status(401).json({ msg: "user not found" });
    }

    const task = await TaskSchema.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "task not found" });
    }

    if (task.user.toString() !== user._id.toString()) {
      return res.status(401).json({ msg: "unauthorized" });
    }

    await task.remove();
    res.status(200).json({ msg: "task deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  postTasks,
  deleteTasks,
  updateTasks,
};

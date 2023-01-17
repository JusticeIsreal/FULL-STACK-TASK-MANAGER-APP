const express = require("express");
const app = express();
const cors = require("cors");

const data = require("./models/taskSchema");
require("dotenv").config();

// import database configuration
const connectTaskDB = require("./Databse/taskDB");

// importing routers
const taskRouter = require("./Route/taskRouter");
const userRouter = require("./Route/userRoute");

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//use basic cors
app.use(cors());

// routes
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/users", userRouter);

const startServer = async () => {
  try {
    await connectTaskDB(process.env.MONGODB_URL);
    app.listen(process.env.PORT, () => {
      console.log("app listening on port 1234");
    });
  } catch (err) {
    console.error(err);
  }
};
startServer();

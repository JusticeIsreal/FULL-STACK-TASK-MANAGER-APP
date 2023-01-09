const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectTaskDB = () => {
  return mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connection established"))
    .catch((e) => console.log(e));
};

module.exports = connectTaskDB;

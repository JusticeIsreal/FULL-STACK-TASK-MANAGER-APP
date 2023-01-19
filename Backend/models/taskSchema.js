const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const taskSchemaFunc = Schema({
  name: {
    type: String,
    required: [true, "cant be emoty"],
    // maxlength: [5, "must not be greater than 10"],
    trim: true,
  },
  status: {
    type: String,
    default: "Open",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "UserSchema",
  },
});

module.exports = model("TaskSchema", taskSchemaFunc);

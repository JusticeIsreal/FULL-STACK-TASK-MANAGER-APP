const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchemaFunc = Schema({
  name: {
    type: String,
    required: [true, "name cant be empty"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email cant be empty"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password cant be empty"],
    trim: true,
  },
  note: [
    {
      type: Schema.Types.ObjectId,
      ref: "NoteSchema",
    },
  ],
  task: [
    {
      type: Schema.Types.ObjectId,
      ref: "TaskSchema",
    },
  ],
});



module.exports = mongoose.model("UserSchema", userSchemaFunc);
// module.exports = model("NoteSchema", noteSchemaFunc);

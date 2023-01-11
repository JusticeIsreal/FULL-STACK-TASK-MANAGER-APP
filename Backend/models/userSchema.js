const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchemaFunc = Schema({
  name: {
    type: String,
    required: [true, "cant be empty"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "cant be empty"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "cant be empty"],
    trim: true,
  },
  notes: {
    type: Schema.Types.ObjectId,
    ref: "NotSchema",
  },
});

const noteSchemaFunc = new Schema({
  content: {
    type: String,
    required: [true, "cant be empty"],
    minlength: 5,
  },
  date: Date,
  users: {
    type: Schema.Types.ObjectId,
    ref: "UserSchema",
  },
});

module.exports = model("UserSchema", userSchemaFunc);
module.exports = model("NoteSchema", noteSchemaFunc);

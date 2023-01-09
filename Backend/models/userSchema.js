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
});

module.exports = model("UserSchema", userSchemaFunc);

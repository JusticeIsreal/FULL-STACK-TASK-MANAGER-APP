const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const noteSchemaFunc = new Schema({
  content: {
    type: String,
    required: [true, " note cant be empty"],
    minlength: 5,
  },
  date: Date,
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: "UserSchema",
    },
  ],
});
module.exports = model("NoteSchema", noteSchemaFunc);

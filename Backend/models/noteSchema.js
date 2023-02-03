const mongoose = require("mongoose");
const { Schema } = mongoose;

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
module.exports = mongoose.model("NoteSchema", noteSchemaFunc);

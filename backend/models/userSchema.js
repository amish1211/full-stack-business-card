const { Schema } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: [1, "Username should not be empty!"],
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address!",
    ],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [8, "Password should be at least 8 characters long!"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: true,
  },
  cards: {
    type: [{ type: Schema.Types.ObjectId, ref: "Card" }],
    default: [],
    required: true,
  },
});

module.exports = userSchema;
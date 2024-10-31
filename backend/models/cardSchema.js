const { Schema } = require("mongoose");

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [1, "Name should not be empty!"],
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: [1, "Description should not be empty!"],
  },
  mediaHandles: {
    type: Map,
    of: {
      type: String,
      trim: true,
      minlength: [1, "Media handle URL should not be empty!"],
      match: [
        /^https:\/\/.+\..+/,
        "One or more media handles have invalid URLs!",
      ],
    },
  },
  interests: {
    type: [String],
    required: true,
    validate: [
      {
        validator: function (v) {
          return v.length > 0;
        },
        message: "There should be at least one interest.",
      },
      {
        validator: function (v) {
          return v.every((str) => str.trim().length > 0);
        },
        message: "Interests should not contain empty strings.",
      },
    ],
  },
});

module.exports = cardSchema;

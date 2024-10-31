const mongoose = require("mongoose");

const cardSchema = require("./cardSchema");
const userSchema = require("./userSchema");

const Card = mongoose.model("Card", cardSchema);
const User = mongoose.model("User", userSchema);

module.exports = { Card, User };

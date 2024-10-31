const cardsRoute = require("./cards");
const express = require("express");
const router = express.Router();

router.use("/cards", cardsRoute);

module.exports = router;

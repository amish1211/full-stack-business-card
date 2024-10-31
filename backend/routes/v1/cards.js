const express = require("express");
const cardsController = require("../../controllers/v1/cardsController");
const {
  validate,
  checkCardExists,
} = require("../../middlewares/validationMiddleware");
const {
  createCardSchema,
  updateCardSchema,
} = require("../../validations/v1/cardValidations");
const authMiddleware = require("../../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", cardsController.getCards);

router.post("/", validate(createCardSchema), cardsController.createCard);

router.get("/:id", cardsController.getCard);

router.put(
  "/:id",
  validate(updateCardSchema),
  checkCardExists,
  cardsController.updateCard
);

router.delete("/:id", checkCardExists, cardsController.deleteCard);

router.delete("/", cardsController.deleteAllCards);

module.exports = router;

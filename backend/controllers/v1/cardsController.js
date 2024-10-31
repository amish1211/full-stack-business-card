const { Card, User } = require("../../models");

async function getCard(req, res, next) {
  const { id } = req.params;

  try {
    const result = await User.findOne({
      cards: id,
    })
      .select("cards")
      .populate({
        path: "cards",
        match: { _id: id },
      });

    return res.json({ card: result.cards[0] });
  } catch (err) {
    return next(err);
  }
}

async function getCards(req, res, next) {
  const user = req.user;
  try {
    const cards = await User.findOne({ username: user })
      .select("cards")
      .populate("cards");

    return res.json({ cards });
  } catch (err) {
    return next(err);
  }
}

async function createCard(req, res, next) {
  const user = req.user;
  const cardData = req.body;

  try {
    const card = await Card.create(cardData);

    await User.findOneAndUpdate(
      { username: user },
      { $push: { cards: card._id } },
      { new: true }
    );
    return res.status(201).json({ card });
  } catch (err) {
    return next(err);
  }
}

async function updateCard(req, res, next) {
  const { id } = req.params;

  const cardData = req.body;

  try {
    await Card.updateOne({ _id: id }, cardData);
    return res.json({ message: "Card updated successfully!" });
  } catch (err) {
    return next(err);
  }
}

async function deleteCard(req, res, next) {
  const { id } = req.params;
  const username = req.user;

  try {
    await Card.deleteOne({ _id: id });
    await User.updateOne({ username }, { $pull: { cards: id } });
    return res.json({ message: "Card deleted successfully!" });
  } catch (err) {
    return next(err);
  }
}

async function deleteAllCards(req, res, next) {
  const user = req.user;
  try {
    await Card.deleteMany();
    await User.updateOne({ username: user }, { cards: [] });
    return res.json({ message: "All cards deleted successfully!" });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getCard,
  getCards,
  createCard,
  updateCard,
  deleteCard,
  deleteAllCards,
};

const { ZodError } = require("zod");
const {User} = require("../models");

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: "Invalid Input" });
    }
    next(error);
  }
};

async function checkCardExists(req, res, next) {
  const username = req.user;
  const { id } = req.params;
  if (!username || !id) {
    return res.status(400).json({ message: "Bad Request" });
  }

  try {
    const doesCardExist = await User.exists({
      username,
      cards: id,
    });

    if (!doesCardExist) {
      return res.status(404).json({ message: "Card not found" });
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = { validate, checkCardExists };

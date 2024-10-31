const {User} = require("../models");

async function authMiddleware(req, res, next) {
  const { username, password } = req.headers;
  if (!username || !password) {
    return res.status(400).send("Bad Request");
  }
  try {
    
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).send("Unauthorized");
    }
    req.user = username;
    return next();
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports = authMiddleware;
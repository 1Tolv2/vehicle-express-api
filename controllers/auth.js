const jwt = require("jsonwebtoken");
const { authorizeUser } = require("../models/user");

const errorResponses = require("../utils/responseMessages");
const JWT_SECRET = process.env.JWT_SECRET;

const { unauthorized, oops, missingReqFields } = errorResponses;

const requireLogin = (req, res, next) => {
  req.user
    ? next()
    : res.status(unauthorized.status).json({ error: unauthorized.message });
};

const handleToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (authHeader && authHeader.split(" ")[0] === "Bearer") {
    const token = authHeader.split(" ")[1];
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return error.message === "jwt expired"
        ? res.status(401).json({ error: "Token expired" })
        : error.message === "invalid token"
        ? res.status(401).json({ error: "Invalid token" })
        : res.status(400).json({ error: "Token error" });
    }
  }
  next();
};

const loginUser = async (req, res) => {
  const missingFields = requiredFieldsCheck(req.body, ["username", "password"]);
  if (missingFields.length !== 0) {
    res.status(missingReqFields.status);
    res.json({
      error: missingReqFields.message,
      missingFields,
    });
  } else {
    const { username, password } = req.body;
    let user = null;
    try {
      user = await authorizeUser(username.toLowerCase(), password);
    } catch (err) {
      return res.status(oops.status).json({ error: oops.message });
    }

    if (user) {
      const userId = user._id.toString();
      const token = jwt.sign({ userId, username: user.username }, JWT_SECRET, {
        expiresIn: "1day",
        subject: userId,
      });
      res.json({ user, token });
    } else {
      res.sendStatus(unauthorized.status);
    }
  }
};

module.exports = { requireLogin, handleToken, loginUser };

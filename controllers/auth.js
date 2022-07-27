const jwt = require("jsonwebtoken");
const {
  verifyUser,
  createUser,
  findUserByUsername,
} = require("../models/user");
const JWT_SECRET = process.env.JWT_SECRET;

const requireLogin = (req, res, next) => {
  req.user ? next() : res.status(401).json({ error: "Unauthorized" });
};

const registerNewUser = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (!(username && password)) {
    res
      .status(400)
      .json({ error: "Invalid data. Username and password is required." });
  } else {
    if (await findUserByUsername(username)) {
      res
        .status(400)
        .json({ error: "User already exists, username must be unique" });
    } else {
      const user = await createUser({
        username: username.toLowerCase(),
        password,
      });

      res.json({ username: user.username });
    }
  }
};

const logInUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await verifyUser(username.toLowerCase(), password);

  if (user) {
    const userId = user._id.toString();
    const token = jwt.sign({ userId, username: user.username }, JWT_SECRET, {
      expiresIn: "1day",
      subject: userId,
    });
    res.json({ user, token });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { requireLogin, registerNewUser, logInUser };

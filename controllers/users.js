const { findUserById, updateUser } = require("../models/user");

const handleNewUser = async (req, res) => {
  const { username, password } = req.body;
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

const getCurrentUser = async (req, res) => {
  const id = req.user.userId;
  const user = await findUserById(id);
  res.status(200).json({ user });
};

const editCurrentUser = async (req, res) => {
  const id = req.user.userId;
  const body = req.body;

  const user = await updateUser(id, body);
  res.status(200).json({ message: "Success" });
};

module.exports = { getCurrentUser, editCurrentUser, handleNewUser };

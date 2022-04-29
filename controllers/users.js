const { createUser, getUserById, getAllUsers } = require("../models/user");

const handleNewUser = async (req, res) => {
  const newUser = req.body;
  // const user = await createUser(newUser);
  res.status(201).json({ message: "success" });
};

const getUser = async (req, res) => {
  const id = req.user.userId;
  const user = await getUserById(id);
  res.status(200).json({ user });
};

module.exports = { handleNewUser, getUser };

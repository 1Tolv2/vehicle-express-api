const { findUserById, updateUser } = require("../models/user");

const getCurrentUser = async (req, res) => {
  const id = req.user.userId;
  const user = await findUserById(id);
  res.status(200).json({ user });
};

const editUser = async (req, res) => {
  const id = req.user.userId;
  const body = req.body;

  const user = await updateUser(id, body);
  res.status(200).json({ message: "Success" });
};

module.exports = { getCurrentUser, editUser };

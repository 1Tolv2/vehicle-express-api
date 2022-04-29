const { getUserById } = require("../models/user");

const getCurrentUser = async (req, res) => {
  const id = req.user.userId;
  const user = await getUserById(id);
  res.status(200).json({ user });
};

module.exports = { getCurrentUser };

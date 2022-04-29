const { createUser, getUserById, getAllUsers } = require("../models/users");

const handleNewUser = async (req, res) => {
  const newUser = req.body;
  const user = await createUser(newUser);
  res.status(201).json({ message: "success" });
};

const getUser = async (req, res) => {};

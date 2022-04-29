const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, default: "" },
  password: { type: String, required: true },
  email: { type: String, default: "" },
  vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" }],
  settings: {
    language: { type: String, default: "en" }, // en, sv
    darkmode: { type: Boolean, default: false },
    units: { type: String, default: "metric" }, // metric, imperial
  },
});

const User = mongoose.model("User", UserSchema);

const createUser = (newUser) => {
  const user = new User({newUser})
  await user.save()
  return user
};

// const updateUser = () => {};

const getUserById = (id) => {
  return User.findById(id)
};

const getAllUsers = () => {
  return User.find()
};

module.exports = {
  createUser,
  // updateUser,
  getUserById,
  getAllUsers,
};

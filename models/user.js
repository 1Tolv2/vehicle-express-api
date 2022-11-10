const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, lowercase: true, unique: true },
  name: { type: String, default: "" },
  password: { type: String, required: true },
  email: { type: String, default: "" },
  // vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" }],
  settings: {
    language: { type: String, default: "en" }, // en, sv
    darkmode: { type: Boolean, default: false },
    units: { type: String, default: "metric" }, // metric, imperial
  },
});

userSchema.pre("save", async function (next) {
  if (this.modifiedPaths().includes("password")) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }
  next();
});

userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  return user && password && (await bcrypt.compare(password, user.password))
    ? user
    : null;
};

const User = mongoose.model("User", userSchema);

const createUser = async (newUser) => {
  const user = new User(newUser);
  await user.save();
  return user;
};

const verifyUser = async (username, password) => {
  const user = await User.login(username, password);
  return user
    ? {
        _id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        settings: user.settings,
        vehicles: user.vehicles,
      }
    : null;
};

const updateUser = (id, body) => {
  return User.findByIdAndUpdate(id, body, { new: true }).exec();
};

const findAllUsers = () => {
  return User.find().select({ password: 0 }).exec();
};

const findUserById = (id) => {
  return User.findById(id).select({ password: 0 }).exec();
};

const findUserByUsername = (username) => {
  return User.findOne({ username }).select({ password: 0 }).exec();
};

module.exports = {
  createUser,
  verifyUser,
  updateUser,
  findUserById,
  findAllUsers,
  findUserByUsername,
};

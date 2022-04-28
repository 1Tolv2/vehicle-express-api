const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" }],
});

const User = mongoose.model("User", UserSchema);

/*
settings:
  km/miles
  darkmode/lightmode
  language: swedish/english
  
  */
module.exports;

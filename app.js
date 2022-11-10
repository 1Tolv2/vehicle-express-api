const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
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
});

app.use("/api", require("./routes/index"));

mongoose.connect(process.env.MONGODB_URI);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

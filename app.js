const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api", indexRouter);

mongoose.connect(process.env.MONGODB_URI);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

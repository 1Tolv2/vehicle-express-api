const express = require("express");
const router = express();

router.use("/v1", require("./v1/index"));
router.use("/hello", (req, res) => {
  res.json({ message: "Hello World!" });
});

module.exports = router;

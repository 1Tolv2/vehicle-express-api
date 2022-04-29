const express = require("express");
const router = express();

router.use("/auth", require("./auth"));
router.use("/users", require("./users"));
router.use("/vehicles", require("./vehicles"));

module.exports = router;

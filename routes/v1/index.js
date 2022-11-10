const express = require("express");
const { requireLogin } = require("../../controllers/auth");
const router = express();

router.use("/auth", require("./auth"));
router.use("/users", requireLogin, require("./users"));
router.use("/vehicles", requireLogin, require("./vehicles"));

module.exports = router;

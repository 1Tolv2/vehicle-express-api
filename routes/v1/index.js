const express = require("express");
const { requireLogin } = require("../../controllers/auth");
const router = express();

router.use("/users", require("./users"));
router.use("/vehicles", requireLogin, require("./vehicles"));

module.exports = router;

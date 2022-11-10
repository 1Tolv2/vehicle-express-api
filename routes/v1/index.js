const express = require("express");
const { requireLogin, handleToken } = require("../../controllers/auth");
const router = express();

router.use(handleToken);
router.use("/users", require("./users"));
router.use("/vehicles", requireLogin, require("./vehicles"));

module.exports = router;

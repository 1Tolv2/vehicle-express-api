const express = require("express");
const a = require("../../controllers/auth");
const router = express();

router.post("/user", a.registerNewUser);
router.post("/api-token", a.logInUser);

module.exports = router;

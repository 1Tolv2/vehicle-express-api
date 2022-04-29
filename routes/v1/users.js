const express = require("express");
const { requireLogin } = require("../../controllers/auth");
const { getCurrentUser } = require("../../controllers/users");
const router = express();

router.get("/", requireLogin, getCurrentUser);

module.exports = router;

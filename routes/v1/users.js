const express = require("express");
const { requireLogin } = require("../../controllers/auth");
const { getCurrentUser, editUser } = require("../../controllers/users");
const router = express();

router.get("/", requireLogin, getCurrentUser);
router.put("/", requireLogin, editUser);

module.exports = router;

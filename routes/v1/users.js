const express = require("express");
const u = require("../../controllers/users");
const a = require("../../controllers/auth");

const router = express();

router.post("/", u.handleNewUser);
router.post("/auth", a.loginUser);
router.get("/me", a.requireLogin, u.getCurrentUser);
router.put("/me", a.requireLogin, u.editCurrentUser);

module.exports = router;

const express = require("express");
const { getCurrentUser, editUser } = require("../../controllers/users");
const router = express();

router.get("/", getCurrentUser);
router.put("/", editUser);

module.exports = router;

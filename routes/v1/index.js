const express = require("express");
const router = express();

router.use("/auth", require("./auth"));
router.use("/users", require("./users"));
router.use("/vehicles", require("./vehicles"));

/*
ROTUES:
    /auth
    /users
    /users/:userId
    /vehicles
    /vehicles/:vehicleId
*/

module.exports = router;

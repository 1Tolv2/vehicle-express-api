const express = require("express");
const v = require("../../controllers/vehicles");
const { requireLogin } = require("../../controllers/auth");
const router = express();

router.get("/", requireLogin, v.getUsersVehicles);
router.get("/:id", requireLogin, v.getVehicle);
router.post("/", requireLogin, v.handleNewVehicle);
router.delete("/:id", requireLogin, v.deleteVehicle);

module.exports = router;

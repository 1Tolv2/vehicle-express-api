const express = require("express");
const v = require("../../controllers/vehicles");
const { requireLogin } = require("../../controllers/auth");
const router = express();

router.get("/", requireLogin, v.getUsersVehicles);
router.post("/", requireLogin, v.handleNewVehicle);
router.get("/:id", requireLogin, v.getVehicle);
router.put("/:id", requireLogin, v.editVehicle);
router.delete("/:id", requireLogin, v.deleteVehicle);

module.exports = router;

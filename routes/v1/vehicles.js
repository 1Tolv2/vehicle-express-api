const express = require("express");
const v = require("../../controllers/vehicles");
const router = express();

router.get("/", v.getUsersVehicles);
router.post("/", v.handleNewVehicle);

router.get("/:id", v.getVehicle);
router.put("/:id", v.editVehicle);
router.delete("/:id", v.handleDeletionOfVehicle);

module.exports = router;

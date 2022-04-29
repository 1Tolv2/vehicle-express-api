const express = require("express");
const {
  handleNewVehicle,
  deleteVehicle,
  getUsersVehicles,
  getVehicle,
} = require("../../controllers/vehicles");
const { requireLogin } = require("../../controllers/auth");
const router = express();

router.get("/", getUsersVehicles);
router.get("/:id", requireLogin, getVehicle);
router.post("/", requireLogin, handleNewVehicle);
router.delete("/:id", requireLogin, deleteVehicle);

module.exports = router;

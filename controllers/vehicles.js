const {
  createVehicle,
  removeVehicle,
  getAllVehiclesByUser,
  getVehicleById,
} = require("../models/vehicle");

const handleNewVehicle = async (req, res) => {
  const newVehicle = req.body;
  const vehicle = await createVehicle(newVehicle);
  res.status(201).json({ message: "success" });
};

const deleteVehicle = async (req, res) => {
  const id = req.params.id;
  await removeVehicle(id);
  res.status(200).json({ message: "success" });
};

const getUsersVehicles = async (req, res) => {
  const vehicles = await getAllVehiclesByUser();
  res.status(200).json({ vehicles });
};

const getVehicle = async (req, res) => {
  const id = req.params.id;
  const vehicle = await getVehicleById(id);
  res.status(200).json({ vehicle });
};

module.exports = {
  handleNewVehicle,
  deleteVehicle,
  getUsersVehicles,
  getVehicle,
};

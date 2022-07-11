const {
  createVehicle,
  deleteVehicle,
  findAllVehiclesByUser,
  findVehicleById,
  updateVehicle,
} = require("../models/vehicle");

const handleNewVehicle = async (req, res) => {
  const newVehicle = req.body;
  const vehicle = await createVehicle({ ...newVehicle, user: req.user.userId });
  res.status(201).json({ vehicle });
};

const handleDeletionOfVehicle = async (req, res) => {
  const id = req.params.id;
  const vehicle = await deleteVehicle(id);
  res
    .status(200)
    .json(
      vehicle.deletedCount
        ? { message: "Vehicle successfully deleted" }
        : { error: "No vehicle found with the given id" }
    );
};

const getUsersVehicles = async (req, res) => {
  const vehicles = await findAllVehiclesByUser();
  res.status(200).json({ vehicles });
};

const getVehicle = async (req, res) => {
  const id = req.params.id;
  const vehicle = await findVehicleById(id);
  res.status(200).json({ vehicle });
};

const editVehicle = async (req, res) => {
  const id = req.user.userId;
  const body = req.body;

  const vehicle = await updateVehicle(id, body);
  res.status(200).json({ message: "Success" });
};

module.exports = {
  handleNewVehicle,
  handleDeletionOfVehicle,
  getUsersVehicles,
  getVehicle,
  editVehicle,
};

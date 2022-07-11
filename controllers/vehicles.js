const { json } = require("express");
const {
  createVehicle,
  deleteVehicle,
  findAllVehiclesByUser,
  findVehicleById,
  updateVehicle,
} = require("../models/vehicle");

const ErrorMessages = { FaultyId: "No vehicle found with the given id." };

const handleNewVehicle = async (req, res) => {
  const newVehicle = req.body;
  const vehicle = await createVehicle({ ...newVehicle, user: req.user.userId });
  res.status(201).json({ vehicle });
};

const handleDeletionOfVehicle = async (req, res) => {
  const id = req.params.id;
  const vehicle = await deleteVehicle(id);
  vehicle.deletedCount
    ? res.status(200).json({ message: "Vehicle successfully deleted" })
    : res.status(404).json({ error: ErrorMessages.FaultyId });
};

const getUsersVehicles = async (req, res) => {
  const vehicles = await findAllVehiclesByUser(req.user.userId);
  res.status(200).json({ vehicles });
};

const getVehicle = async (req, res) => {
  const id = req.params.id;
  const vehicle = await findVehicleById(id);
  res.status(200).json({ vehicle });
};

const updateObject = (object, value) => {
  const tempObject = {};
  for (const key in object) {
    tempObject[key] = value[key];
  }
  return tempObject;
};

const editVehicle = async (req, res) => {
  const { user, params, body } = req;
  params.id !== 24 &&
    res.status(400).json({ error: `${ErrorMessages.FaultyId} Id too short.` });
  const vehicle = (await findVehicleById(params.id)).toObject();
  if (vehicle?.user != user.userId) {
    res.status(403).json({ error: ErrorMessages.FaultyId });
  } else {
    const updateData = {};
    for (const key in body) {
      if (vehicle.hasOwnProperty(key)) {
        if (
          key === "color" ||
          key === "specifications" ||
          key === "modelSpecification"
        ) {
          updateData[key] = updateObject(vehicle[key], body[key]);
        } else {
          updateData[key] = body[key];
        }
      }
    }
    res
      .status(200)
      .json({ vehicle: await updateVehicle(params.id, updateData) });
  }
};

module.exports = {
  handleNewVehicle,
  handleDeletionOfVehicle,
  getUsersVehicles,
  getVehicle,
  editVehicle,
};

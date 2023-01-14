const { json } = require("express");
const errorResponses = require("../utils/responseMessages");
const {
  createVehicle,
  deleteVehicle,
  findAllVehiclesByUser,
  findVehicleById,
  updateVehicle,
} = require("../models/vehicle");
const { requiredFieldsCheck } = require("./index");

const { oops, missingReqFields } = errorResponses;

const ErrorMessages = { FaultyId: "No vehicle found with the given id." };

const handleNewVehicle = async (req, res) => {
  const missingFields = requiredFieldsCheck(req.body, [
    "vehicleType",
    "brand",
    "color",
  ]);
  if (missingFields.length !== 0) {
    res.status(missingReqFields.status);
    res.json({
      error: missingReqFields.message,
      missingFields,
    });
  } else {
    try {
      const newVehicle = req.body;
      const vehicle = await createVehicle({
        ...newVehicle,
        user: req.user.userId,
      });
      res.status(201).json({ vehicle });
    } catch (err) {
      res.status(oops.status).json({ error: oops.message });
    }
  }
};

const handleDeletionOfVehicle = async (req, res) => {
  const id = req.params.id;
  const vehicle = await deleteVehicle(id);
  vehicle.deletedCount
    ? res.status(200).json({ message: "Vehicle successfully deleted." })
    : res.status(404).json({ error: ErrorMessages.FaultyId });
};

const getUsersVehicles = async (req, res) => {
  const vehicles = await findAllVehiclesByUser(req.user.userId, {
    [req.query.sort]: 1,
  });
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

const loopThroughObject = (object, array) => {
  Object.entries(object).map(([key, value]) => {
    if (typeof value === "object" && value !== null) {
      loopThroughObject(value, array);
    } else {
    }
  });
};

const editVehicle = async (req, res) => {
  const { user, params, body } = req;

  const vehicle = await findVehicleById(params.id);
  if (vehicle?.user != user.userId) {
    res.status(403).json({ error: ErrorMessages.FaultyId });
  } else {
    res.status(200).json({ vehicle: await updateVehicle(params.id, body) });
  }
};

module.exports = {
  handleNewVehicle,
  handleDeletionOfVehicle,
  getUsersVehicles,
  getVehicle,
  editVehicle,
};

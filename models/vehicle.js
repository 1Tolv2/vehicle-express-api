const mongoose = require("mongoose");

const TireSchema = new mongoose.Schema({
  purchased: { type: Date, default: null },
  daysUsed: { type: Number, default: 0 },
  brand: { type: String, default: null },
  model: { type: String, default: null },
  size: { type: String, default: null },
  tirePressure: { type: Number, default: 0 },
});

const LiquidSchema = new mongoose.Schema({
  brand: { type: String, default: null },
  model: { type: String, default: null },
  viscosity: { type: String, default: null },
  amount: { type: Number, default: 0 }, // liters/gallons
  lastChanged: { type: Date, default: null },
});

const VehicleSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  nickname: { type: String, default: "" },
  registrationNumber: { type: String, default: "" },
  vehicleType: { type: Number, required: true }, // 1. Car, 2. Motorcycle
  mileage: { type: Number, default: 0 },
  inTraffic: { type: Boolean, default: true },
  brand: { type: String, required: true, default: "" },
  model: { type: String, default: null },
  modelYear: { type: Number, default: 0 },
  color: {
    primaryColor: { type: String, default: null, required: true },
    secondaryColor: { type: String, default: null },
  },
  specifications: {
    insurance: {
      date: { type: Date, default: null },
      company: { type: String, default: null },
      type: { type: String, default: null }, // trafic, half, whole
    },
    inspection: {
      lastInspection: { type: Date, default: new Date() },
      nextInspection: { type: Date, default: null },
      inspectionInterval: { type: Number, default: 12 }, //months
    },
    tires: {
      inUse: { type: Number, default: 0 },
      tireSet: [
        {
          tireSetId: { Number, default: 0 },
          tireType: { type: String, default: "allYearRound" }, // winter, summer, allYearRound
          tires: [TireSchema],
        },
      ],
    },
    sparkplugs: {
      brand: { type: String, default: null },
      model: { type: String, default: null },
      lastChanged: { type: Date, default: null },
      lastSpaced: { type: Date, default: null },
    },
    liquids: {
      breakFluid: { LiquidSchema },
      engineOil: { LiquidSchema },
      gearOil: { LiquidSchema },
      powerSteeringFluid: { LiquidSchema },
      coolant: { LiquidSchema },
      forkOil: { LiquidSchema },
    },
  },
  modelSpecification: {
    weight: { type: Number, default: 0 }, // kg/pounds
    engine: {
      size: { type: Number, default: 0 }, // liter/cc
      model: { type: String, default: null }, // ex. B202
      fuelType: { type: String, default: null }, // gasoline, diesel, electric, gas, ethanol
      fuelCapacity: { type: Number, default: 0 }, // liters/gallons
      powerKW: { type: Number, default: 0 }, // kW
      powerHP: { type: Number, default: 0 }, // hp
    },
    gearBox: {
      type: { type: String, default: null }, // manual, automatic
      gears: { type: Number, default: 0 },
    },
    wheelDimensions: {
      tires: [{ type: String, default: null }],
    },
  },
  notes: [{ type: String, createdAt: new Date() }],
});

const Vehicle = mongoose.model("Vehicle", VehicleSchema);

const createVehicle = async (newVehicle) => {
  var vehicle = new Vehicle(newVehicle);
  await vehicle.save();
  return vehicle;
};

const updateVehicle = async (id, body) => {
  return await Vehicle.findByIdAndUpdate(id, body, {
    new: true,
  }).exec();
};

const deleteVehicle = async (id) => {
  return Vehicle.deleteOne({ _id: mongoose.Types.ObjectId(id) }).exec();
};
const findAllVehiclesByUser = async (id, sort) => {
  return Vehicle.find({ user: mongoose.Types.ObjectId(id) })
    .sort({ brand: 1, model: 1, ...sort })
    .exec();
};
const findVehicleById = async (id) => {
  return Vehicle.findById(id).exec();
};

module.exports = {
  createVehicle,
  updateVehicle,
  deleteVehicle,
  findAllVehiclesByUser,
  findVehicleById,
};

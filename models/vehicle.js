const mongoose = require("mongoose");

const TireSchema = new mongoose.Schema({
  purchased: { type: Date, default: null },
  daysUsed: { Number, default: 0 },
  brand: { type: String, default: null },
  model: { type: String, default: null },
  size: { type: String, default: null },
  tirePressure: { Number, default: 0 },
});

const LiquidSchema = new mongoose.Schema({
  brand: { type: String, default: null },
  model: { type: String, default: null },
  viscosity: { type: String, default: null },
  amount: { Number, default: 0 }, // liters/gallons
  lastChanged: { type: Date, default: null },
});

const VehicleSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  registrationNumber: { type: String },
  vehicleType: { type: Number, required: true }, // 1. Car, 2. Motorcycle
  mileage: { Number, default: 0 },
  inTrafic: { type: Boolean, default: true },
  brand: { type: String, required: true, default: "" },
  model: { type: String, default: null },
  modelYear: { Number, default: 0 },
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
    inpection: {
      lastInspection: { type: Date },
      nextInspection: { type: Date, default: null },
      inspectionInterval: { Number, default: 0 }, //months
    },
    tires: {
      inUse: { Number, default: 0 },
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
    weight: { Number, default: 0 }, // kg/pounds
    engine: {
      engineSize: { Number, default: 0 }, // liter/cc
      engineModel: { type: String, default: null }, // ex. B202
      fuelType: { type: String, default: null }, // gasoline, diesel, electric, gas, ethanol
      fuelCapacity: { Number, default: 0 }, // liters/gallons
      power: { Number, default: 0 }, // kW
      horsePower: { Number, default: 0 }, // hp
    },
    gearBox: {
      type: { type: String, default: null }, // manual, automatic
      gears: { Number, default: 0 },
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
  return Vehicle.deleteOne({ _id: mongoose.Types.ObjectId(id) });
};
const findAllVehiclesByUser = async (id) => {
  return Vehicle.find({ user: mongoose.Types.ObjectId(id) });
};
const findVehicleById = async (id) => {
  return Vehicle.findById(id);
};

module.exports = {
  createVehicle,
  updateVehicle,
  deleteVehicle,
  findAllVehiclesByUser,
  findVehicleById,
};

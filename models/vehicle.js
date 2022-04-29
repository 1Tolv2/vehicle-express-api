const mongoose = require("mongoose");

const TireSchema = new mongoose.Schema({
  bought: Date,
  daysUsed: Number,
  tireType: String,
  make: String,
  model: String,
  tirePressure: Number,
});

const LiquidSchema = new mongoose.Schema({
  brand: String,
  model: String,
  viscocity: String,
  amount: Number, // liters/gallons
  lastChanged: Date,
});

const VehicleSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  registrationNumber: { type: String },
  vehicleType: { type: Number, required: true }, // 1. Car, 2. Motorcycle
  mileage: Number,
  inTrafic: Boolean,
  brand: { type: String, required: true },
  model: { type: String },
  modelYear: Number,
  color: {
    primaryColor: String,
    secondaryColor: String,
  },
  specifications: {
    insurance: {
      date: Date,
      company: String,
      type: String, // trafic, half, whole
    },
    inpection: {
      lastInspection: Date,
      nextInspection: Date,
      inspectionInterval: Number,
    },
    tires: {
      inUse: Number,
      tireSet: [
        {
          tireSetId: { type: Number },
          tire: [TireSchema],
        },
      ],
    },
    sparkplugs: {
      brand: String,
      model: String,
      lastChanged: Date,
      lastSpaced: Date,
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
    weight: Number, // kg/pounds
    engine: {
      engineSize: Number, // cc
      engineType: String,
      fuelType: String, // gasoline, diesel, electric, gas, ethanol
      fuelCapacity: Number, // liters/gallons
      power: Number, // kW
      horsePower: Number, // hp
    },
    gearBox: {
      type: { type: String, default: "" }, // manual, automatic
      gears: Number,
    },
    wheelDimentions: {
      tires: [{ String }],
    },
  },
});

const Vehicle = mongoose.model("Vehicle", VehicleSchema);

const createVehicle = async (newVehicle) => {
  console.log("NEW VEHICLE", newVehicle);
  try {
    var vehicle = new Vehicle(newVehicle);
  } catch (e) {
    console.log("ERROR", e);
    return;
  }
  await vehicle.save();
  return vehicle;
};

// const updateVehicle = async () => {};

const removeVehicle = async (id) => {
  return Vehicle.deleteOne({ _id: mongoose.Types.ObjectId(id) });
};
const getAllVehiclesByUser = async (id) => {
  return Vehicle.find({ user: mongoose.Types.ObjectId(id) });
};
const getVehicleById = async (id) => {
  return Vehicle.findById(id);
};

module.exports = {
  createVehicle,
  //   updateVehicle,
  removeVehicle,
  getAllVehiclesByUser,
  getVehicleById,
};

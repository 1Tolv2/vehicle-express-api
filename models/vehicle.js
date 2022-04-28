const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" }],
});

/*
registrationNumber:
brand: yamaha
model: XJ6
vehicleType: motorcycle, car
mileage: in km or miles
color: { 
    primaryColor: white, 
    secondaryColor: black 
    }
inTrafic: true
modelYear: 2014
insurance: {}
taxes: {}
maintenanceSchedule: {}
specifications: {
    inpection: { 
        lastInspection: 2022-04-25,
        nextInspection: 2024-04-25,
        inspectionInterval: 24 months,
        }
    tires: {
        inUse: 0
        tireSet: [{
            tireId: 0,
            front: {
                bought: ,
                daysUsed: ,
                tireType: "205/55/15",
                make: "Dunlop",
                model: roadsmart,
                tirePressure: 2.3
                },
            rear: {
                bought:
                daysUsed: 
                tireType: "205/55/15",
                bought:
                daysUsed: 
                tireType: "205/55/15",
                make: "Dunlop",
                model: roadsmart,
                tirePressure: 2.5
                },
            }]
        }
    sparkplugs: {},
    battery: {},

    liquids: {
        breakFluid: { 
            brand: , 
            model: , 
            amount: , 
            lastChanged: , 
        },
        engineOil: { 
            brand: , 
            model: , 
            viscocity: , 
            amount: , 
            lastChanged: , 
        },
        gearOil: { 
            brand: , 
            model: , 
            viscocity: , 
            amount: , 
            lastChanged: , 
        },
        powerSteeringFluid: { 
            brand: , 
            model: , 
            amount: , 
            lastChanged:
        },
        coolant: { 
            brand: , 
            model: , 
            amount: , 
            lastChanged: 
        },
        forkOil: { 
            brand: , 
            model: , 
            viscocity: , 
            amount: , 
            lastChanged: , 
        },
    }
}

modelSpecification: {
    weight: 210kg,
    engine: {
        engineSize: 599cc, 
        engineType: 16v inline four,
        fuelType: gasoline, 
        fuelCapacity: 19L,
        power: 57kW (76hp)
    }
    gearBox: {
        type: manual,
        gears: 6
    }
    wheelDimentions: {
        front: 120/70ZR17M/C (58W), 
        rear: 160/60ZR17M/C (69W)
    }
}

*/

const Vehicle = mongoose.model("Vehicle", VehicleSchema);

module.exports;

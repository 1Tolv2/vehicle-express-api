<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/1Tolv2/weather-app">
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Vehicle REST API</h3>

  <p align="center">
    Express.js server
    <br />
    <a href="https://github.com/1Tolv2/vehicle-api"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/1Tolv2/vehicle-api/issues">Propose Feature</a>
	  ·
    <a href="https://github.com/1Tolv2/vehicle-api/issues">Report Bug</a>
  </p>
</div>


# Intro
This is a REST API, it returns JSON data about a users added vehicles such as make and model and also more specific data such as engine and tire specifications.

The intended use for the the API is to be used with an app that allows a user to put in data about their vehicle to keep the information organized and to be used as a tool to keep up with the maintenance. 

## Requests
Resources can be accessed through standard HTTPS-requests.
The following methods can be used with the API:

| Method   | Action                            |
| -------- |---------------------------------- |
| GET      | Retrieve resources                |
| POST     | Creates resources                 |
| PUT      | Change and/or replace resources   |
| DELETE   | Deletes resources                 |




## Endpoints
The base URL of the API is http://localhost:8800/api/v1.

The following endpoints can be accessed with a request containing a JSON web token.

### Users

- **GET** /users
- **PUT** /users
- **POST** /auth/user
- **POST** /auth/api-token

### Vehicles
- **GET** /vehicles
- **POST** /vehicles
- **GET** /vehicles/{id}
- **PUT** /vehicles/{id}
- **DELETE** /vehicles/{id}

## Responses
API responses are sent in the JSON format.
Down below you can find examples of request and responses

<details><summary>GET /vehicles</summary>

### Request
```
URL: http://localhost:8800/api/v1/vehicles
Method: "GET",
Headers: {
    "Authorization": "Bearer {token}",
    "Content-Type": "application/json"
}
```

### Response
```
{
    vehicles: [{
      user: objectID("62cc2bf7731d13d5eba8d773"),
      registrationNumber: "HNG308",
      *vehicleType: 1, // 1. Car, 2. Motorcycle
      mileage: 0,
      inTrafic: true,
      *brand: "SAAB",
      model: "90",
      modelYear: 1985,
      color: {
        primaryColor: "Blue",
        secondaryColor: "Black",
      },
      specifications: {
        insurance: {
          date: 2022-12-02,
          company: "Folksam",
          type: 1, // 1. trafic, 2. half, 3. whole default: null
        },
        inpection: {
          lastInspection: 2022-04-24,
          nextInspection: 2024-04-24,
          inspectionInterval: 24,
        },
        tires: {
          inUse: 1,
          tireSet: [
            {
              tireSetId: 1,
              tireType: "summer"
              tires: [{  
                purchased: 2020-02-15,
                daysUsed: 185,
                brand: "Michelin",
                model: "Defender",
                size: "185/65R15",
                tirePressure: 2.2
              }, {  
                purchased: 2020-02-15,
                daysUsed: 185,
                brand: "Michelin",
                model: "Defender",
                size: "185/65R15",
                tirePressure: 2.2
              }, {  
                purchased: 2020-02-15,
                daysUsed: 185,
                brand: "Michelin",
                model: "Defender",
                size: "185/65R15",
                tirePressure: 2.2
              }, {  
                purchased: 2020-02-15,
                daysUsed: 185,
                brand: "Michelin",
                model: "Defender",
                size: "185/65R15",
                tirePressure: 2.2
              }],
            },
          ],
        },
        sparkplugs: {
          brand: "NGK",
          model: "VL4",
          lastChanged: 2020-10-20,
          lastSpaced: 2022-03-05,
        },
        liquids: { // Uses a standard liquidSchema, showed for engineOil
          engineOil: {  
            brand: "Castrol",
            model: "GTX",
            viscosity: "15W-50",
            amount: 3.8, // liters
            lastChanged: 2021-12-13, },
          breakFluid: { ... LiquidSchema },
          gearOil: { ... LiquidSchema },
          powerSteeringFluid: { ... LiquidSchema },
          coolant: { ... LiquidSchema },
          forkOil: { ... LiquidSchema },
        },
      },
      modelSpecification: {
        weight: 1190, // kg/pounds
        engine: {
          engineSize: 2.0, // liter
          engineModel: "B201"
          fuelType: "gasoline",
          fuelCapacity: 63, // liters
          power: 73, // kW
          horsePower: 98, // hp
        },
        gearBox: {
          type: manual,
          gears: 4,
        },
        wheelDimensions: {
          tires: [ 165R15, 165R15],
        },
      },
    },
    {...}]
}
```

</details>

<details><summary>POST /auth/api-token</summary>

### Request

```
URL: http://localhost:8800/api/v1/auth/api-token
Method: "POST",
Headers: {
    "Content-Type": "application/json"
}
Body: JSON.stringify(payload),
```

### Response
```
Object {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmQ3YmUzZWQ2N2I0MjczZjRiZWMzZWEiLCJ1c2VybmFtZSI6InRvbHYiLCJpYXQiOjE2NTg5NTcwODcsImV4cCI6MTY1OTA0MzQ4Nywic3ViIjoiNjJkN2JlM2VkNjdiNDI3M2Y0YmVjM2VhIn0.JzgExCShjyrraMWiL1vf7Tu6hEl8vDgASVt-EXYW3hI",
  "user": Object {
    "_id": "62d7be3ed67b4273f4bec3ea",
    "email": "",
    "name": "",
    "settings": Object {
      "darkmode": false,
      "language": "en",
      "units": "metric",
    },
    "username": "tolv"
  },
}
```

</details>

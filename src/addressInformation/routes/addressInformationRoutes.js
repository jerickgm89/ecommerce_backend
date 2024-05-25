const routesAddresses = require("express").Router()
const {
    createControllerAddress,
    getControllerAddress,
    getAllByUserControllerAddress,
    updateUserControllerAddress,
    deleteAddressUserControllerAddress
} = require('../controllers/addressesController.js')
routesAddresses.get("/", getControllerAddress ); //getAll provincias con query llega a city
routesAddresses.post("/:idUser", createControllerAddress );
routesAddresses.get("/:idUser", getAllByUserControllerAddress ); //getAll provincias con query llega a city
routesAddresses.put("/idAddress/:idAddress", updateUserControllerAddress ); //getAll provincias con query llega a city
routesAddresses.delete("/idAddress/:idAddress", deleteAddressUserControllerAddress ); //getAll provincias con query llega a city

// routesAddresses.get("/:provinces/:city", controllerAddress);


module.exports = routesAddresses; 
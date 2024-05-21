const routesAddresses = require("express").Router()
const {
    controllerAddress
} = require('../controllers/addressesController.js')
// routesAddresses.get("/:provinces/:city", controllerAddress);
routesAddresses.get("/", controllerAddress);
// routesAddresses.get("/:provinces/:city", controllerAddress);

module.exports = routesAddresses; 
const routesAddresses = require("express").Router()
const {
    createControllerAddress,
    getProvinceControllerAddress,
    getPostalCodeControllerAddress,
    getAllByUserControllerAddress,
    updateUserControllerAddress,
    deleteAddressUserControllerAddress
} = require('../controllers/addressesController.js')
routesAddresses.get("/", getProvinceControllerAddress ); //getAll provincias con query llega a city
routesAddresses.get("/postal/:postalCode", getPostalCodeControllerAddress ); //getAll provincias con query llega a city
routesAddresses.post("/:idUser", createControllerAddress ); // crea dirección asociada a usuario (si es diferente el nombre de la calle y el numero de cualquier otra registrada)
routesAddresses.get("/:idUser", getAllByUserControllerAddress );  // obtiene todas las direcciones asociadas al usuario
routesAddresses.put("/idAddress/:idAddress", updateUserControllerAddress ); // obtiene la dirección en particular del usuario
routesAddresses.delete("/idAddress/:idAddress", deleteAddressUserControllerAddress ); // borra la dirección solicitada

// routesAddresses.get("/:provinces/:city", controllerAddress);


module.exports = routesAddresses; 
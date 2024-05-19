const {
    controllerRegisterUser,
    controllerGetAllUsers,
    controllerGetUserById,
    controllerModifyUser,
    controllerDeleteUser,
    controllersUnlockUser,
    controllerGetUserByEmail
} = require("../controllers/userController.js")

const routesUsers = require("express").Router()

routesUsers.post("/", controllerRegisterUser);        //ruta para crear usuarios
routesUsers.get("/", controllerGetAllUsers);          // obtiene todos los Users
routesUsers.get("/:id", controllerGetUserById);       // busca User por idUser
routesUsers.put("/:id", controllerModifyUser);        // modifica user pasando el id
routesUsers.delete("/:id", controllerDeleteUser);     // borrar user pasando el id
routesUsers.delete("/unlock/:id", controllersUnlockUser)
routesUsers.get("/verify/:emailUser", controllerGetUserByEmail);       // busca User por idUser

module.exports = routesUsers; 
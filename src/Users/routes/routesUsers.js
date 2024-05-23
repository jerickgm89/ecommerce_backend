const {
    controllerRegisterUser,
    controllerGetAllUsers,
    controllerGetUserById,
    controllerModifyUser,
    controllerDeleteUser,
    controllersUnlockUser,
    controllersRestoreUser,
    controllerGetUserByEmail,
    controllerGetToken,
    controllergetUserByOnlyEmail
} = require("../controllers/userController.js")
const upload = require('../../configCloudinary.js')

const routesUsers = require("express").Router()

routesUsers.post("/",upload.single('pictureUser'), controllerRegisterUser);        //ruta para crear usuarios
routesUsers.get("/", controllerGetAllUsers);          // obtiene todos los Users
routesUsers.get("/:id", controllerGetUserById);       // busca User por idUser
routesUsers.put("/:id", upload.single('pictureUser'), controllerModifyUser);        // modifica user pasando el id
routesUsers.get("/email/:emailUser", controllergetUserByOnlyEmail);        // modifica user pasando el id
routesUsers.delete("/:id", controllerDeleteUser);     // borrar user pasando el id
routesUsers.delete('/unlock/:id', controllersUnlockUser) //desactivar un usuario
routesUsers.delete('/restore/:id', controllersRestoreUser) //re activar un usuario
routesUsers.get("/verify/:emailUser", controllerGetUserByEmail);       // busca User por email por params y devuelve token
routesUsers.get("/auth/token", controllerGetToken);       // recibe token por header y entrega la info del usuario si el token es válido

module.exports = routesUsers;  
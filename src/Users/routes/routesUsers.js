const {
    controllerRegisterUser,
    controllerGetAllUsers,
    controllerGetUserById,
    controllerModifyUser,
    controllerDeleteUser,
    controllersRestoreUser,
    controllerGetUserByEmail,
    controllerGetToken,
    controllergetUserByOnlyEmail,
    controllersDeactiveUser,
    controllersBlockedUser,
    isActiveUserControllerEmail,
    isAdminUserControllerEmail
} = require("../controllers/userController.js")
const upload = require('../../configCloudinary.js')

const routesUsers = require("express").Router()

routesUsers.post("/", upload.single('pictureUser'), controllerRegisterUser);        //ruta para crear usuarios
routesUsers.get("/", controllerGetAllUsers);          // obtiene todos los Users
routesUsers.get('/deactive', controllersDeactiveUser) //Obtenemos la lista de los usuarios desactivados
routesUsers.get("/:id", controllerGetUserById);       // busca User por idUser
routesUsers.put("/:id", upload.single('pictureUser'), controllerModifyUser);        // modifica user pasando el id
routesUsers.get("/email/:emailUser", controllergetUserByOnlyEmail);        // modifica user pasando el id
routesUsers.delete("/:id", controllerDeleteUser);     // borrar user pasando el id
routesUsers.delete('/blocked/:id', controllersBlockedUser) //desactivar un usuario
routesUsers.delete('/restore/:id', controllersRestoreUser) //re activar un usuario
routesUsers.get("/verify/:emailUser", controllerGetUserByEmail);       // busca User por email por params y devuelve token
routesUsers.get("/auth/token", controllerGetToken);       // recibe token por header y entrega la info del usuario si el token es válido
routesUsers.get("/isActive/:emailUser", isActiveUserControllerEmail);   // recibe email por params y devuelve si está activo o no
routesUsers.get("/admin/:emailUser", isAdminUserControllerEmail);   // recibe idUser por params y devuelve si es admin o no

module.exports = routesUsers;  
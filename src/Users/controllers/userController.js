const {
    registerUserServices,
    getAllUsersServices,
    getUserByIdServices,
    modifyUserServices,
    deleteUserServices
} = require('../services/userService.js')

const controllerRegisterUser = async (request, response) => {
    try {
        const { name, lastName, email, password } = request.body
        
        if( !name || !lastName || !email || !password ){
            return response
            .status(400)
            .json({message: "Todos los campos son requeridos"})
        }
        // return response.json("hola")
        
        const newUser = await registerUserServices({
            name, lastName, email, password
        })
        return response
        .status(201)
        .json( newUser )
        
    } catch (error) {
        response
        .status(500)
        .json({error: error})
        // .json({message: "No fue posible crear el usuario"})
        
    }
};

const controllerGetAllUsers = async (request, response) => {
    try {
        const allUsersList = await getAllUsersServices();
        return response
        .status(200)
        .json( allUsersList )

    } catch (error) {
        response
        .status(500)
        .json({message: "Usuarios no fueron encontrados"})
        
    }
};


const controllerGetUserById = async (request, response) =>{
    const { params } = request;
    const idUser = params.id;
    try {
        
        const searchedUser = await getUserByIdServices(idUser);
        return response
        .status(200)
        .json(searchedUser)

    } catch (error) {
        response
        .status(500)
        .json({message: "Usuario no pudo ser encontrado"})
        
    }
};  

const controllerModifyUser = async (request, response) =>{
    const { params } = request;
    const idUser = params.id;
    // const { body } = request
    const { nameUser, lastNameUser, emailUser, numberMobileUser, password, activeUser } = request.body
    try {
        
        const modifiedUser = await modifyUserServices( idUser, { nameUser, lastNameUser, emailUser, numberMobileUser, password, activeUser });
        if(!modifiedUser){
            return response
            .status(400)
            .json({ message: "Usuario no encontrado" })
        }
        const getUpdatedUser = await getUserByIdServices(idUser);
        return response
        .status(200)
        .json(getUpdatedUser)
    } catch (error) {
        response
        .status(500)
        .json({ message: "Usuario no pudo ser modificado" })
        
    }
};  
const controllerDeleteUser = async (request, response) =>{
    const { params } = request;
    const idUser = params.id;
    try {
        
        const deletedUser = await deleteUserServices(idUser);

        return response
        .status(200)
        .json(deletedUser)
        
    } catch (error) {
        response
        .status(500)
        .json({message: "Usuario no pudo ser eliminado"})
        
    }
    
};

module.exports = {
    controllerGetAllUsers,
    controllerRegisterUser,
    controllerGetUserById,
    controllerModifyUser,
    controllerDeleteUser
}
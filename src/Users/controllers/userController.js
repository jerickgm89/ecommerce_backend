const {
    logInUserServices,
    getAllUsersServices,
    getUserByIdServices,
    modifyUserServices,
    deleteUserServices
} = require('../services/userService.js')

const controllerRegisterUser = async (request, response) => {
    try {
        const { 
            given_name,
            family_name,
            email,
            picture,
            email_verified,
            userRole,
        } = request.body
        
        if( !given_name || !family_name || !email || !picture || !email_verified ){
            return response
            .status(400)
            .json({message: "Todos los campos son requeridos"})
        }

        
        const newUser = await logInUserServices({
            given_name,
            family_name,
            email,
            picture,
            email_verified,
            userRole,
        })

        return response
        .status(201)
        .json( newUser )
        
    } catch (error) {
        response
        .status(500)
        // .json({error: error})
        .json({message: "No fue posible crear el usuario"})
        
    }
};

// const controllerGetAllUsers = async (request, response) => {
//     try {
//         const allUsersList = await getAllUsersServices();
//         return response.status(200).json(allUsersList)

//     } catch (error) {
//         response
//         .status(500)
//         .json({message: "Usuarios no fueron encontrados"})
        
//     }
// };
const controllerGetAllUsers = async (request, response) => {
    try {
        let allUsersList = await getAllUsersServices();

        // Filtrado por nombre, apellido o correo electrónico
        const { name, lastName, email } = request.query;
        if (name) {
            allUsersList = allUsersList.filter(user => user.nameUser.toLowerCase() === name.toLowerCase());
        }
        if (lastName) {
            allUsersList = allUsersList.filter(user => user.lastNameUser.toLowerCase() === lastName.toLowerCase());
        }
        if (email) {
            allUsersList = allUsersList.filter(user => user.emailUser.toLowerCase() === email.toLowerCase());
        }

        // Paginado
        if (request.query.page && request.query.pageSize) {     //Verifico parametros
            const { page, pageSize } = request.query;           //Pagina actual y tamaño
            const startIndex = (page - 1) * pageSize;           //INdice de inicio y fin
            const endIndex = page * pageSize;
            allUsersList = allUsersList.slice(startIndex, endIndex); //Extraigo usuarios
        }

        // Verificar si se encontraron usuarios después del filtrado
        if (allUsersList.length === 0) {
            return response.status(404).json({ message: "No se encontraron usuarios con los criterios proporcionados" });
        }

        return response.status(200).json(allUsersList);
    } catch (error) {
        response.status(500).json({ message: "Usuarios no fueron encontrados" });
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
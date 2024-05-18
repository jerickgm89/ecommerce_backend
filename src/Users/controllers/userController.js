const {
    logInUserServices,
    getAllUsersServices,
    getUserByIdServices,
    modifyUserServices,
    deleteUserServices,
    unlockUserService
} = require('../services/userService.js')

const controllerRegisterUser = async (request, response) => {
    try {
        const { 
            given_name,
            family_name,
            email,
            picture,
            email_verified,
            idAdmin,
        } = request.body
        
        if( !given_name || !family_name || !email || !picture || !email_verified ){
            return response
            .status(400)
            .json({message: "Todos los campos son requeridos"})
        }

        
        const [user,create] = await logInUserServices({
            given_name,
            family_name,
            email,
            picture,
            email_verified,
            idAdmin,
        })
        if(!create){
            return response
            .status(200)
            .json( user )
        }

        return response
        .status(201)
        .json( user )
        
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
            const startIndex = (page - 1) * pageSize;           //Índice de inicio y fin
            const endIndex = page * pageSize;
            allUsersList = allUsersList.slice(startIndex, endIndex); //Extraigo usuarios
        }

        // Verificar si se encontraron usuarios después del filtrado
        if ( !allUsersList.length ) {
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
    const { DNI, nameUser, lastNameUser, emailUser, pictureUser, numberMobileUser, email_verified, activeUser, isAdmin } = request.body
    const newUserInfo = { DNI, nameUser, lastNameUser, emailUser, pictureUser, numberMobileUser, email_verified, activeUser, isAdmin }
    try {
        
        const modifiedUser = await modifyUserServices( idUser, newUserInfo);
        // const modifiedUser = await modifyUserServices( idUser, { DNI, nameUser, lastNameUser, emailUser, numberMobileUser, pictureUser, email_verified, activeUser, isAdmin });
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
}
const controllersUnlockUser = async (req, res) => {
    
    const {idUser} = req.params
    try {
        const unlockuser = await unlockUserService(idUser)
        return res.status(200).json({destroy: true, unlockuser})
        
    } catch (error) {
        return res.status(500).send('Usuario no pudo ser desactivado')
    }
}
    
    

module.exports = {
    controllerGetAllUsers,
    controllerRegisterUser,
    controllerGetUserById,
    controllerModifyUser,
    controllerDeleteUser,
    controllersUnlockUser
}
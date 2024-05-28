require('dotenv').config()
const { sendWelcomeEmail, sendReviewEmail } = require('../../config/nodeMailer/controllersMailer.js')
const {
    loginUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    modifyUser,
    deleteUser,
    verifyEmail,
    verifyingTokenUser,
    restoreUser,
    getDeactiveUser,
    blockedUser
} = require('../repositories/usersRepository.js')

const logInUserServices = async ( userInfo ) => {
    
    const infoUser = {
        // DNI: Number(dni),
        nameUser: userInfo.given_name,
        lastNameUser: userInfo.family_name,
        emailUser: userInfo.email.toLowerCase(),
        pictureUser: userInfo.picture,
        email_verified : userInfo.email_verified,
        // isAdmin
    }
    const [ user,create ] = await loginUser( infoUser );
    // await sendWelcomeEmail( infoUser.emailUser, infoUser.emailUser )
    // await sendReviewEmail( infoUser.emailUser, infoUser.emailUser )
    return [user,create]
}

const getAllUsersServices = async () => {
    const allUsersList = await getAllUsers();
    return allUsersList
}

const getUserByIdServices = async ( idUser ) =>{
    
    const searchedUser = await getUserById( idUser )
    if(!searchedUser){
        throw new Error ('Usuario no fue encontrado')
    }
    return searchedUser
}
const getUserByEmailServices = async ( email ) =>{
    const searchedUser = await getUserByEmail( email )
    // if(!searchedUser){
        //     throw new Error ('Usuario no fue encontrado')
        // }
        return searchedUser
    }
    
    
    const modifyUserServices = async ( idUser, infoToEdit ) => {
        
        const modifiedUser = await modifyUser( idUser,  infoToEdit );
        // if(!userExist){
            //     throw new Error ('Usuario no fue encontrado')
            // }
            // console.log(modifiedUser)
            return modifiedUser
        }
        
        const deleteUserServices = async ( idUser ) => {
            const deletedUser = await deleteUser( idUser );
            if( !deleteUser ){
                throw new Error ('Usuario no fue encontrado')
            }
            return deletedUser
        }
        
        
        const blockedUserServices = async (idUser) => {
            const userBlocked = await blockedUser(idUser);
            if(!userBlocked) {
                throw new Error('No existe usuario para desactivar.')
            }
            return userBlocked
        }
        
        const restoreUserServices = async (idUser) => {
            const userRestore = await restoreUser(idUser)
            if(!userRestore) {
                throw new Error('No se pudo restaurar el usuario')
            }        
            return userRestore
        }
        
        const serviceGetByEmail = async ( emailToVerify ) => {
            // console.log("acaaaaaaaaa en servicegetbyEmail")
            const userIsVerified = await verifyEmail( emailToVerify )
            return userIsVerified
        }
        
        const verifyingTokenService = async ( token ) => {
    const verifyingToken = await verifyingTokenUser( token );
    return verifyingToken
}
const { getLastRegisteredUsersServices } = require('./ruta/al/archivo/services/lastRegisteredUsersService');

const controllerGetLastRegisteredUsers = async (request, response) => {
    try {
        let lastUsersList = await getLastRegisteredUsersServices();

        return response.status(200).json(lastUsersList);
    } catch (error) {
        response.status(500).json({ message: "No se pudieron obtener los últimos usuarios registrados" });
    }
};

module.exports = {
    controllerGetLastRegisteredUsers
};


const getDeactiveUserService = async () => {
    const deactiveUser = await getDeactiveUser()
    if(!deactiveUser) {
        throw new Error('No se pudo Encontrar usuarios desactivados')
    }
    return deactiveUser
}

module.exports = {
    logInUserServices,
    getAllUsersServices,
    getUserByIdServices,
    getUserByEmailServices,
    modifyUserServices,
    deleteUserServices,
    serviceGetByEmail,
    blockedUserServices,
    restoreUserServices,
    verifyingTokenService,
    getDeactiveUserService
}
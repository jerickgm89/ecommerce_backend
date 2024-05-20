require('dotenv').config()
const { sendWelcomeEmail } = require('../../config/nodeMailer/controllersMailer.js')
const {
    loginUser,
    getAllUsers,
    getUserById,
    modifyUser,
    deleteUser,
    unlockUser,
    restoreUser,
    verifyEmail,
    verifyingTokenUser
} = require('../repositories/usersRepository.js')

const logInUserServices = async ( userInfo ) => {

    
    const infoUser = {
        // DNI: Number(dni),
        nameUser: userInfo.given_name,
        lastNameUser: userInfo.family_name,
        emailUser: userInfo.email,
        pictureUser: userInfo.picture,
        email_verified : userInfo.email_verified,
    }
    const [ user,create ] = await loginUser( infoUser );
    await sendWelcomeEmail( infoUser.emailUser, infoUser.emailUser )
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

const modifyUserServices = async ( idUser, infoToEdit ) => {
    const userExist = await getUserByIdServices( idUser )
    if(!userExist){
        throw new Error ('Usuario no fue encontrado')
    }
    const modifiedUser = await modifyUser( idUser, infoToEdit );
    // if(!userExist){
    //     throw new Error ('Usuario no fue encontrado')
    // }

    return modifiedUser
}

const deleteUserServices = async ( idUser ) => {
    const deletedUser = await deleteUser( idUser );
    if( !deleteUser ){
        throw new Error ('Usuario no fue encontrado')
    }
    return deletedUser
}


const unlockUserServices = async (idUser) => {
    const unlockuser = await unlockUser(idUser);
    if(!unlockuser) {
        throw new Error('No existe usuario para desactivar.')
    }
    return unlockuser
}

const restoreUserServices = async (idUser) => {
    const restoreuser = await restoreUser(idUser)
    if(!restoreuser) {
        throw new Error('No se pudo restaurar el usuario')
    }
    return restoreuser
}

const serviceGetByEmail = async ( emailToVerify ) => {

    const userIsVerified = await verifyEmail( emailToVerify )
    return userIsVerified
}

const verifyingTokenService = async ( token ) => {
    const verifyingToken = await verifyingTokenUser( token );
    return verifyingToken
}

module.exports = {
    logInUserServices,
    getAllUsersServices,
    getUserByIdServices,
    modifyUserServices,
    deleteUserServices,
    serviceGetByEmail,
    unlockUserServices,
    restoreUserServices,
    verifyingTokenService
}
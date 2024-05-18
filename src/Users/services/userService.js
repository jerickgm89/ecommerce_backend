require('dotenv').config()
const {sendWelcomeEmail} = require('../../config/nodeMailer/controllersMailer.js')

const {
    loginUser,
    getAllUsers,
    getUserById,
    modifyUser,
    deleteUser
} = require('../repositories/usersRepository.js')

//convertir a numero el dni
const logInUserServices = async ({ given_name, family_name, email, picture, email_verified, userRole }) => {
    const userInfo = {
        // DNI: Number(dni),
        nameUser: given_name,
        lastNameUser: family_name,
        emailUser: email,
        pictureUser: picture,
        email_verified,
        // idAdmin
    }
    try {
        const newUser = await loginUser(userInfo);
        
        await sendWelcomeEmail(email, given_name)
        
         return newUser
    } catch (error) {
        console.error('Error al registrar el usuario', error);
    }
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

const modifyUserServices = async (idUser, infoToEdit) => {
    const userExist = await getUserByIdServices(idUser)
    if(!userExist){
        throw new Error ('Usuario no fue encontrado')
    }
    const modifiedUser = await modifyUser(idUser, infoToEdit);
    // if(!userExist){
    //     throw new Error ('Usuario no fue encontrado')
    // }

    return modifiedUser
}

const deleteUserServices = async (idUser) => {
    const deletedUser = await deleteUser(idUser);
    if(!deleteUser){
        throw new Error ('Usuario no fue encontrado')
    }
    return deletedUser
}

module.exports = {
    logInUserServices,
    getAllUsersServices,
    getUserByIdServices,
    modifyUserServices,
    deleteUserServices
}
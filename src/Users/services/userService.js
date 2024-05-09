const {
    registerUserInDB,
    getAllUsers,
    getUserById,
    modifyUser,
    deleteUser
} = require('../repositories/usersRepository.js')

//convertir a numero el dni
const registerUserServices = async ({ name, lastName, email, password }) => {
    const userInfo = {
        // DNI: Number(dni),
        nameUser: name,
        lastNameUser: lastName,
        emailUser: email,
        password: password
    }
    const newUser = await registerUserInDB(userInfo);
    return newUser
}

// listar todos los usuarios nombre correo, telefono
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
    const modifiedUser = await modifyUser(idUser, infoToEdit);
    if(!modifiedUser){
        throw new Error ('Usuario no fue encontrado')
    }
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
    registerUserServices,
    getAllUsersServices,
    getUserByIdServices,
    modifyUserServices,
    deleteUserServices
}
// Servicio para obtener todos los drivers
// Busca los drivers en la API y en la base de datos
// Retorna los drivers encontrados en la API y en la base de datos debidamente formateados

// const { getAllTeams, createTeam } = require('../repositories/teamRepository');
// const { fetchApi } = require('../utils/fetchApi')


// importa desde repositories






// y en utils fetchApi.js ejecuta axios O formatSendResponse (// Desc: Formatea la respuesta de los drivers para enviarla al cliente)
// const axios = require('axios');
// const API = 'http://localhost:5000/drivers';



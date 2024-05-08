const  { EntityUsers } = require('../../db.js');

const registerUserInDB = async (newUserInfo) => {
    const newUser = await EntityUsers.create(newUserInfo);
    // console.log(newUser)
    return newUser;
}
const getAllUsers = async () =>{
    const listAllUsers = await EntityUsers.findAll();
    return listAllUsers;
}
const getUserById = async (idUser) =>{
    const userToFind = await EntityUsers.findOne({
        where: {
            idUser: idUser
        }
    })
    return userToFind
}
const modifyUser = async (idUser, infoToEdit) =>{
    const editedUser = await EntityUsers.update(
        infoToEdit, { where: {
                idUser: idUser
            }
        },
    )
    return editedUser[0]
}
const deleteUser = async (idUser) =>{
    const deletedUser = await EntityUsers.destroy({
        where: {
            idUser: idUser
        }
    });
    return !!deletedUser
}
module.exports = {
    registerUserInDB,
    getAllUsers,
    getUserById,
    modifyUser,
    deleteUser
}

// Solo este utiliza sequelize e importa los modelos (desde la db)

// const { Op } = require('sequelize');
// const { Driver, Teams } = require('../../src/db');
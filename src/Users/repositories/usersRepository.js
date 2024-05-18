const  { EntityUsers } = require('../../db.js');

const loginUser = async (newUserInfo) => {
    const [user, created] = await EntityUsers.findOrCreate({where: newUserInfo});
    return [user, created];
}

const getAllUsers = async () =>{
    const listAllUsers = await EntityUsers.findAll();
    
    return listAllUsers;
};

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
        infoToEdit, 
        { 
            where: {
                idUser: idUser
            }
        },
    )
    return editedUser

};

const deleteUser = async (idUser) =>{
    const deletedUser = await EntityUsers.destroy({
        where: {
            idUser: idUser
        }
    });
    return !!deletedUser
}

const unlockUser = async (idUser) => {
    const unlockUser = await User.findOne({where: {idUser: idUser}})
    unlockUser.destroy()
    return unlockUser
}
module.exports = {
    loginUser,
    getAllUsers,
    getUserById,
    modifyUser,
    deleteUser,
    unlockUser
}
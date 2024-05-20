const  { EntityUsers } = require('../../db.js');

const loginUser = async (newUserInfo) => {
    const [user, created] = await EntityUsers.findOrCreate({where: newUserInfo});
    return [user, created];
}


const getAllUsers = async () =>{
    const listAllUsers = await EntityUsers.findAll({
        where: {activeUser: true}
    });
    return listAllUsers;
};

const getUserById = async (idUser) => {
    const userToFind = await EntityUsers.findOne({
        where: {
            idUser
        }
    })
    return userToFind
}
const modifyUser = async (idUser, infoToEdit) => {
    const editedUser = await EntityUsers.update(
        infoToEdit, 
        { 
            where: {
                idUser
            }
        },
    )
    return editedUser

};

const deleteUser = async (idUser) => {
    const deletedUser = await EntityUsers.destroy({
        where: {
            idUser
        }
    });
    return !!deletedUser
}

const unlockUser = async (idUser) => {
    const unlockUser = await User.findOne({where: { idUser }})
    unlockUser.destroy()
    return unlockUser
}

const verifyEmail = async ( emailToVerify ) => {
    const user = await EntityUsers.findOne(
        { 
            where: {
                emailUser: emailToVerify
        }
    })
    if( user ){
        const { isAdmin, tokenAuth } = user;
        return { isAdmin, tokenAuth }
    }
    return false
}

module.exports = {
    loginUser,
    getAllUsers,
    getUserById,
    modifyUser,
    deleteUser,
    unlockUser,
    verifyEmail
}
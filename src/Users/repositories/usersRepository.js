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

const getUserById = async (idUser) =>{
    const userToFind = await EntityUsers.findOne({
        where: {
            activeUser: true,
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
                activeUser: true,
                idUser: idUser
            }
        },
    )
    return editedUser

};

const deleteUser = async (idUser) =>{
    const deletedUser = await EntityUsers.destroy({
        where: {
            activeUser: true,
            idUser: idUser
        }
    });
    return !!deletedUser
}

const unlockUser = async (idUser) => {
    const user = await EntityUsers.findOne(idUser);
 
    user.activeUser = false;
    await user.save();
    return user;
};

const restoreUser = async (idUser) => {
    const restoreuser = await EntityUsers.findOne(idUser, {paranoid : true})

    restoreuser.activeUser = true
    await restoreuser.restore()
    await  restoreuser.save()
    
    return restoreuser;
}
module.exports = {
    loginUser,
    getAllUsers,
    getUserById,
    modifyUser,
    deleteUser,
    unlockUser,
    restoreUser
}
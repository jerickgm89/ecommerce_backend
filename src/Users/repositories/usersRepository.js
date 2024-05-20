const  { EntityUsers } = require('../../db.js');
const jwt = require('jsonwebtoken') // para crear token
const { JWT_SECRET } = process.env


const loginUser = async ({ nameUser, lastNameUser, emailUser, pictureUser, email_verified }) => {
    const tokenJWT = jwt.sign(
        {
            emailUser
        },
        JWT_SECRET,
        {
            expiresIn: "40h" // expira en 40 horas
        }
    )
    const newUserInfo = {
        nameUser,
        lastNameUser,
        emailUser,
        pictureUser,
        email_verified,
    };

    const [ user, create ]  = await EntityUsers.findOrCreate({ 
        where: { emailUser },
        defaults: newUserInfo
    });
    if( create ){
        user.tokenAuth = tokenJWT
        user.changed('tokenAuth', true)
        await user.save();
        return [user, create]
    }
    return [user, create];
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
        }
    )
    // Si el correo ya estaba registrado
    if( user ){
        // y tiene un token creado
        if( user.tokenAuth ){
            try {
                
                //Verificar token
                const decoded = jwt.verify( user.tokenAuth, JWT_SECRET );
                // si el token existe, uso el email de la decodificación
                // para retornar la información del usuario
                if( decoded.emailUser ){
                    return user.tokenAuth
                }
            // Si el token no es válido o está caduco
            } catch (error) {
                
                if (error.name === 'TokenExpiredError') {
                    const newToken = generateToken(emailUser);
                    // genero un nuevo token y se lo asigno al usuario
                    user.tokenAuth = newToken;
                    user.changed('tokenAuth', true);
                    await user.save();
                    return newToken
                }
            }
        }
    }
    // si no es un usuario registrado
    return false
}

const verifyingTokenUser = async (token) => {
    try {
        const decoded = jwt.verify( token, JWT_SECRET );
        const user = await EntityUsers.findOne({
            where: {
                emailUser: decoded.emailUser
            }
        })
        if( user ){
            return user
        }
        else throw new Error (" el token no esta asignado a ningun usuario registrado")
        
    } catch (error) {
        if(error.name == "TokenExpiredError"){
            const decoded = jwt.decode(token);
            const user = await EntityUsers.findOne({
                where: {
                    emailUser: decoded.emailUser
                }
            })
            if( user ) {
                const newToken = generateToken(user.emailUser);
                user.tokenAuth = newToken;
                user.changed('tokenAuth', true);
                await user.save();
                return user
            }
        }
        else throw new Error ("Token error")
    }
}

module.exports = {
    loginUser,
    getAllUsers,
    getUserById,
    modifyUser,
    deleteUser,
    unlockUser,
    verifyEmail,
    verifyingTokenUser
}
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const  { EntityUsers, EntityUserAddress } = require('../../db.js');
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
    const userExist = await EntityUsers.findByPk(idUser)
    let userToFind;
    if( !!userExist.idUserAddress ){
        userToFind = await EntityUsers.findOne({
            where: {
                idUser
            },
            include: {
                model: EntityUserAddress,
                attributes: ['numberAddress', 'addressName', 'postalCode', 'provinceAddress', 'cityAddress', 'country']
            }
        })
    }
    else{
        userToFind = await EntityUsers.findOne({
            where: {
                idUser
            }
        })
    }
    return userToFind
}

const getUserByEmail = async (email) => {
    const userToFind = await EntityUsers.findOne({
        where: {
            emailUser: email
        }
    })
    return !!userToFind.emailUser
}

const modifyUser = async (idUser, { 
    DNI,
    nameUser, 
    lastNameUser, 
    emailUser, 
    pictureUser,
    phoneArea,
    numberMobileUser,
    email_verified, 
    activeUser, 
    isAdmin,
    numberAddress,
    addressName,
    postalCode,
    provinceAddress,
    cityAddress,
    country
}) => {

    // const imageToUpload = req.file ? (await cloudinary.uploader.upload(file.path)).secure_url : pictureUser ?(await cloudinary.uploader.upload(pictureUser)).secure_url: null
    const toUsersChart = {
        DNI: parseInt(DNI),
        nameUser, 
        lastNameUser, 
        emailUser, 
        pictureUser,
        phoneArea: `${phoneArea}`,
        numberMobileUser: `${numberMobileUser}`,
        email_verified, 
        activeUser, 
        isAdmin,
    }
    const toUserAddressChart = {
        numberAddress: `${numberAddress}`,
        addressName,
        postalCode: `${postalCode}`,
        provinceAddress,
        cityAddress,
        country
    }

    // console.log(toUserAddressChart, "user adress chart");
    // return toUserAddressChart
    const userInfo = await EntityUsers.findOne({
        where: {
            idUser
        }
    })
    if(!!userInfo){
        if( !userInfo.idUserAddress ){
            const createInEntityUserAddress = await EntityUserAddress.create( toUserAddressChart )
            toUsersChart.idUserAddress = createInEntityUserAddress.idUserAddress
            console.log("userAddresses", createInEntityUserAddress);
            // userInfo.changed('idUserAddress', true)
            // await userInfo.save()
        }
        const editedUser = await EntityUsers.update(
            toUsersChart, 
            { 
                where: {
                    idUser
                }
            },
        )
            
        return editedUser
    }
    else throw new Error ('Usuario no fue encontrado')

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

// const transaction = await EntityUsers.sequelize.transaction();
// const product = await EntityProducts.findByPk(id, { transaction });

// await product.save({ transaction });
//     await transaction.commit();

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
    getUserByEmail,
    modifyUser,
    deleteUser,
    unlockUser,
    verifyEmail,
    verifyingTokenUser
}
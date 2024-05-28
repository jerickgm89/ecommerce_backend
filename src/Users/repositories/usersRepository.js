const { CloudinaryStorage } = require('multer-storage-cloudinary');
const  { EntityUsers, EntityUserAddress} = require('../../db.js');
const jwt = require('jsonwebtoken'); // para crear token

const { JWT_SECRET } = process.env;
const { createAddressUser } = require('../../addressInformation/repository/repositoriesAddressUser.js')

const loginUser = async ({ nameUser, lastNameUser, emailUser, pictureUser, email_verified, isAdmin }) => {
    
    const newUserInfo = {
        nameUser,
        lastNameUser,
        emailUser:emailUser,
        pictureUser,
        email_verified,
        isAdmin
    };
    const [ user, create ]  = await EntityUsers.findOrCreate({ 
        where: { emailUser },
        defaults: newUserInfo
    });
    const tokenJWT = jwt.sign(
        {
            emailUser, 
            isActive: create ? true : user.isActive,
            isAdmin: user.isAdmin
        },
        JWT_SECRET
        // {
        //     expiresIn: "4h" // expira en 40 horas
        // }
    );

    
    if( create ){
        user.tokenAuth = tokenJWT;
        user.changed('tokenAuth', true);
        await user.save();
        await user.reload();
        return [user, create];
    };
    return [user, create];
};


const getAllUsers = async () =>{
    const listAllUsers = await EntityUsers.findAll({
        where: {activeUser: true},
        order: [['idUser', 'ASC']],
        
    });
    return listAllUsers;
};

const getUserById = async (idUser) => {
    const userById = await EntityUsers.findOne({
        where:{
            idUser
        },
        include:   {
            model: EntityUserAddress,
            attributes: ['numberAddress', 'addressName', 'postalCode', 'provinceAddress', 'cityAddress', 'country']
        },
        
    });
    return userById;
};

const getUserByEmail = async (email) => {
    const userToFind = await EntityUsers.findOne({
        where: {
            emailUser: email
        }
    });
    return !!userToFind.emailUser;
};
const getDeactiveUser = async () => {
    const deactiveUser = await EntityUsers.findAll({
        where: {activeUser: false},
        order: [['idUser', 'ASC']],
        include: [{
            model: EntityUserAddress,
            attributes: ['numberAddress', 'addressName', 'postalCode', 'provinceAddress', 'cityAddress', 'country']
        }]
    });
    return deactiveUser;
};

const modifyUser = async (idUser, { 
    DNI,
    nameUser, 
    lastNameUser,
    pictureUser,
    phoneArea,
    numberMobileUser,
    email_verified, 
    activeUser, 
    isAdmin,
    identifierName,
    numberAddress,
    addressName,
    postalCode,
    provinceAddress,
    cityAddress,
    country,
}) => {

    // const imageToUpload = req.file ? (await cloudinary.uploader.upload(file.path)).secure_url : pictureUser ?(await cloudinary.uploader.upload(pictureUser)).secure_url: null
    const toUsersChart = {
        DNI: parseInt(DNI),
        nameUser, 
        lastNameUser, 
        pictureUser,
        phoneArea: `${phoneArea}`,
        numberMobileUser: `${numberMobileUser}`,
        email_verified, 
        activeUser, 
        isAdmin,
    };
    const toUserAddressChart = {
        identifierName, //nonbre para identificar la dirección, dado por el user
        numberAddress: `${numberAddress}`, // numero de casa calle
        addressName, // nombre calle
        postalCode: `${postalCode}`,
        provinceAddress,
        cityAddress,
        country
    };

    const userInfo = await EntityUsers.findByPk(idUser);
    // console.log(userInfo)

    // Si existe un usuario con ese id
    if(userInfo){
        // Y lo recibido por body incluye toda la información necesaria para crear una dirección
        let findOrCreateAddressUser;

        if( numberAddress && addressName && postalCode && provinceAddress && cityAddress){
            
            findOrCreateAddressUser = await createAddressUser(idUser, toUserAddressChart)
            
        }
            
            // Si existe información de dirección asociada al usuario
            
            // Siempre que el usuario exista modificará la información de usuario e incluye modelo
        const editedUser = await EntityUsers.update(
            toUsersChart, 
            { 
                where: {
                    idUser
                }
            },
        );
        if(!editedUser){
            throw new Error ('Algo falló en la modificación en usuario' + idUser)
        };

        const updatedUser = await EntityUsers.findOne({
            where:{
                idUser
            },
            include: {
                model: EntityUserAddress,
                attributes: ['identifierName', 'numberAddress', 'addressName', 'postalCode', 'provinceAddress', 'cityAddress', 'country']
            }
        });

        return updatedUser;
    }
    // // Si no existe el usuario retorna un error
    else throw new Error ('Usuario no fue encontrado')
};

const deleteUser = async (idUser) => {
    const deletedUser = await EntityUsers.destroy({
        where: {
            idUser
        }
    });
    return !!deletedUser;
};

const blockedUser = async (idUser) => {
    console.log('unlock: ',idUser);
    const blockedUser = await EntityUsers.findByPk(idUser)
    
    blockedUser.activeUser = false;
    await blockedUser.save();
    
    return blockedUser;
};

const restoreUser = async (idUser) => {
    console.log('restore: ', idUser);
    const restoreUser = await EntityUsers.findByPk(idUser, {paranoid: false});

    restoreUser.activeUser = true;
    await restoreUser.restore();
    await restoreUser.save();

    return restoreUser;
};


const verifyEmail = async ( emailToVerify ) => {
    const user = await EntityUsers.findOne(
        { 
            where: {
                emailUser: emailToVerify
            }
        }
    );
    // Si el correo ya estaba registrado
    if( !!user ){
        // y tiene un token creado
        // console.log("el user ->", user.tokenAuth)
        if( user.tokenAuth ){
            // try {
                
                //Verificar token
                const decoded = jwt.decode( user.tokenAuth, JWT_SECRET );
                // si el token existe, uso el email de la decodificación
                // para retornar la información del usuario
                if( decoded.emailUser ){
                    console.log("jwt:   ",decoded.emailUser)
                    return user.tokenAuth
                }
            // Si el token no es válido o está caduco
            // } catch (error) {
                
            //     if (error.name === 'TokenExpiredError') {
            //         const newToken = generateToken(emailUser);
            //         // genero un nuevo token y se lo asigno al usuario
            //         user.tokenAuth = newToken;
            //         user.changed('tokenAuth', true);
            //         await user.save();
            //         return newToken;
            //     };
            // }
        }
    }
    // si no es un usuario registrado
    else return false;
};


const verifyingTokenUser = async (token) => {
    // try {
        const {emailUser, isActive, isAdmin} = jwt.decode( token, JWT_SECRET );
        // const decoded = jwt(token)
        // console.log("TOKEN ->  ", token)
        // console.log("DECODE ->>> ", emailUser, isActive, isAdmin)
        const user = await EntityUsers.findOne({
            where: {
                emailUser,
                activeUser:true
            }
        });
        if( user ){
            return user
        }
        else throw new Error (" el token no esta asignado a ningun usuario registrado")
        
    // } catch (error) {
        // if(error.name == "TokenExpiredError"){
        //     const decoded = jwt.decode(token);
        //     const user = await EntityUsers.findOne({
        //         where: {
        //             emailUser: decoded.emailUser
        //         }
        //     });
        //     if( user ) {
        //         const newToken = generateToken(user.emailUser);
        //         user.tokenAuth = newToken;
        //         user.changed('tokenAuth', true);
        //         await user.save();
        //         return user
        //     };
        // }
        // }
        // else throw new Error ("Token error")
}
const isActiveUserEmail = async (email) => {
    const {activeUser} = await EntityUsers.findOne({
        where: {
            emailUser: email
        }
    });
    return !!activeUser;
};

module.exports = {
    loginUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    modifyUser,
    deleteUser,
    blockedUser,
    restoreUser,
    verifyEmail,
    verifyingTokenUser,
    getDeactiveUser,
    isActiveUserEmail
}
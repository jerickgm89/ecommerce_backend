const { CloudinaryStorage } = require('multer-storage-cloudinary');
const  { EntityUsers, EntityUserAddress } = require('../../db.js');
const jwt = require('jsonwebtoken') // para crear token
const { JWT_SECRET } = process.env;


const loginUser = async ({ nameUser, lastNameUser, emailUser, pictureUser, email_verified }) => {
    const tokenJWT = jwt.sign(
        {
            emailUser
        },
        JWT_SECRET,
        {
            expiresIn: "40h" // expira en 40 horas
        }
    );
    const newUserInfo = {
        nameUser,
        lastNameUser,
        emailUser,
        pictureUser,
        email_verified,
        // isAdmin
    };

    const [ user, create ]  = await EntityUsers.findOrCreate({ 
        where: { emailUser },
        defaults: newUserInfo
    });
    if( create ){
        user.tokenAuth = tokenJWT;
        user.changed('tokenAuth', true);
        await user.save();
        return [user, create];
    };
    return [user, create];
};


const getAllUsers = async () =>{
    const listAllUsers = await EntityUsers.findAll({
        where: {activeUser: true},
        order: [['idUser', 'ASC']]
    });
    return listAllUsers;
};

const getUserById = async (idUser) => {
   
    const userById = await EntityUsers.findOne({
        where:{
            idUser
        },
        include: {
            model: EntityUserAddress,
            attributes: ['numberAddress', 'addressName', 'postalCode', 'provinceAddress', 'cityAddress', 'country']
        }
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
    emailUser, 
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
    const emailFormated = emailUser ? emailUser.toLowerCase() : null;    // console.log("EMAILFORMATED",addressName)
    const toUsersChart = {
        DNI: parseInt(DNI),
        nameUser, 
        lastNameUser, 
        emailUser: emailFormated, 
        pictureUser,
        phoneArea: `${phoneArea}`,
        numberMobileUser: `${numberMobileUser}`,
        email_verified, 
        activeUser, 
        isAdmin,
    };
    const toUserAddressChart = {
        identifierName,
        numberAddress: `${numberAddress}`,
        addressName,
        postalCode: `${postalCode}`,
        provinceAddress,
        cityAddress,
        country
    };

    const userInfo = await EntityUsers.findByPk(idUser);
    // console.log(userInfo)
    if(userInfo){
        if( numberAddress && addressName && postalCode && provinceAddress && cityAddress){

            // Si existe un usuario con ese id
            let addressInfo;
            //Busca todas las direcciones del usuario que también coincidan con el nombre de la dirección dada
            addressInfo = await EntityUserAddress.findOne({ 
                where: {
                    idUser,
                    addressName
                }
            });
            // si no existen direcciones asociadas al usuario con ese nombre pero quiere agregarla
            if( !addressInfo && addressName ){
                // Le asigna idUser a la info para crear
                toUserAddressChart.idUser = idUser
                addressInfo = await EntityUserAddress.create( toUserAddressChart )
                // y crea la dirección asociada al usuario
            };
        };
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
                };
            // Si el token no es válido o está caduco
            } catch (error) {
                
                if (error.name === 'TokenExpiredError') {
                    const newToken = generateToken(emailUser);
                    // genero un nuevo token y se lo asigno al usuario
                    user.tokenAuth = newToken;
                    user.changed('tokenAuth', true);
                    await user.save();
                    return newToken;
                };
            };
        };
    };
    // si no es un usuario registrado
    return false;
};


const verifyingTokenUser = async (token) => {
    try {
        const decoded = jwt.decode( token, JWT_SECRET );
        // const decoded = jwt(token)
        console.log("DECODE:  ", token)
        const user = await EntityUsers.findOne({
            where: {
                emailUser: decoded.emailUser
            }
        });
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
            });
            if( user ) {
                const newToken = generateToken(user.emailUser);
                user.tokenAuth = newToken;
                user.changed('tokenAuth', true);
                await user.save();
                return user
            };
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
    blockedUser,
    restoreUser,
    verifyEmail,
    verifyingTokenUser,
    getDeactiveUser
}
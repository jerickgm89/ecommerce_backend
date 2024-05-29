const {
    logInUserServices,
    getAllUsersServices,
    getUserByIdServices,
    getUserByEmailServices,
    modifyUserServices,
    deleteUserServices,
    blockedUserServices,
    serviceGetByEmail,
    verifyingTokenService,
    getDeactiveUserService,
    restoreUserServices,
    isActiveUserEmailService
} = require('../services/userService.js')
const { imageCloudinaryUploader } = require('../../../utils/imageReception.js')



const controllerRegisterUser = async (request, response) => {
    try {
        const { 
            given_name,
            family_name,
            email,
            picture,
            email_verified,
            isAdmin
        } = request.body
        
        const fileImages =  request.file
        const imagesUploader = (await imageCloudinaryUploader( fileImages, picture ))[0]

        if( !email ){
            return response
            .status(400)
            .json({message: "Proporcione un correo electrónico"})
        }
        const [ user, create ] = await logInUserServices({
            given_name,
            family_name,
            email,
            picture: imagesUploader,
            email_verified,
            isAdmin,
        })
        if( !create ){
            return response
            .status(200)
            .json( user.tokenAuth )
        }

        return response
        .status(201)
        .json( user.tokenAuth )
        
    } catch (error) {
        response
        .status(500)
        // .json({error: error})
        .json({message: error})
        // .json({message: "No fue posible crear el usuario"})
        
    }
};

const controllerGetAllUsers = async (request, response) => {
    try {
        let allUsersList = await getAllUsersServices();

        // Filtrado por nombre, apellido o correo electrónico
        const { name, lastName, email } = request.query;
        if (name) {
            allUsersList = allUsersList.filter(user => user.nameUser.toLowerCase() === name.toLowerCase());
        }
        if (lastName) {
            allUsersList = allUsersList.filter(user => user.lastNameUser.toLowerCase() === lastName.toLowerCase());
        }
        if (email) {
            allUsersList = allUsersList.filter(user => user.emailUser.toLowerCase() === email.toLowerCase());
        }
        

        // Paginado
        if (request.query.page && request.query.limit) {     //Verifico parametros
            const { page, limit } = request.query;           //Pagina actual y tamaño
            const startIndex = (page - 1) * limit;           //Índice de inicio y fin
            const endIndex = page * limit;
            allUsersList = allUsersList.slice(startIndex, endIndex); //Extraigo usuarios
        }

        // Verificar si se encontraron usuarios después del filtrado
        if ( !allUsersList.length ) {
            return response.status(200).json([])
        }
        return response.status(200).json(allUsersList);
    } catch (error) {
        response.status(500).json({ message: "Usuarios no fueron encontrados" });
    }
};




const controllerGetUserById = async (request, response) =>{
    const params = request.params;
    const idUser = params.id;
    try {
        const searchedUser = await getUserByIdServices(idUser);
        return response
        .status(200)
        .json(searchedUser)

    } catch (error) {
        response
        .status(500)
        .json({message: "Usuario no pudo ser encontrado"})
        console.error(error.message)
        
    }
};  
const controllergetUserByOnlyEmail = async (request, response) => {
    const { emailUser } = request.params;
    const formatedEmail = emailUser.trim().toLowerCase()
    try {
        const email = await getUserByEmailServices( formatedEmail )
        if(email) return response.status(200).json(true)
    } catch (error) {
        response
        .status(400)
        .json(false)
        
    }
}
const controllerModifyUser = async (request, response) =>{
    const { params } = request;
    const idUser = params.id;
    const objectPetition = request.body

    const fileImages =  request.file
    const { 
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
        country
    } = objectPetition
    
    const imagesUploader = (await imageCloudinaryUploader( fileImages, pictureUser ))[0]

    try {
        // console.log(objectPetition)
        const modifiedUser = await modifyUserServices( idUser, { 
            DNI: `${DNI}`,
            nameUser, 
            lastNameUser, 
            emailUser, 
            pictureUser: imagesUploader,
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
            country
        });

        if(!modifiedUser){
            return response
            .status(400)
            .json({ message: "Usuario no encontrado" })
        }

        return response
        .status(200)
        .json(modifiedUser)
        
    } catch (error) {
        response
        .status(500)
        // .json({ message: "Usuario no pudo ser modificado" })
        .json({ error: error.message })
    }
};  
const controllerDeleteUser = async (request, response) =>{
    const { params } = request;
    const idUser = params.id;
    try {
        
        const deletedUser = await deleteUserServices(idUser);

        return response
        .status(200)
        .json(deletedUser)
        
    } catch (error) {
        response
        .status(500)
        .json({message: "Usuario no pudo ser eliminado"})
        
    };
};

const controllersBlockedUser = async (req, res) => {
    const {params} = req;
    const idUser = params.id;
    try {
        const user = await getUserByIdServices(idUser);
        
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (!user.activeUser) {
            return res.status(400).json({ message: 'El usuario ya está bloqueado' });
        };
        
        const blockedUser = await blockedUserServices(idUser);
        return res.status(200).json({ message: 'Usuario  ha sido desactivado con éxito', blockedUser });

    } catch (error) {
        
        return res.status(500).json({ error: 'Error al intentar desactivar  usuario', details: error.message });
    };
};
const controllersRestoreUser = async (req, res) => {
    const {params} = req;
    const idUser = params.id;
    try {
        const user = await getUserByIdServices(idUser)
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        if(user.activeUser) {
            return res.status(400).json({message: 'El usuario Ya fue restaurado'})
        }
        
        const restoreUser = await restoreUserServices(idUser);
        return res.status(200).json({ message: 'Usuario ha sido restaurado con éxito.', restoreUser });
    } catch (error) {
        return res.status(500).json({ error: 'Usuario no pudo  ser restaurado', details: error.message });
    }
};


const controllerGetUserByEmail = async ( req, res ) =>{
    try {
        let { emailUser } = req.params;
        emailUser = emailUser.trim().toLowerCase()
        const isVerified = await serviceGetByEmail( emailUser );

        if( !isVerified ){
            return res.status(200).json( isVerified )
        }
        return res.status(200).json( isVerified )
        
    } catch (error) {
        return res.status(500).send( 'No se pudo procesar la solicitud' )
    }
}

const controllerGetToken = async (request, response) => {
    try {
        const token = request.header('Authorization').split(' ')[1]
        const verifying = await verifyingTokenService( token )
        response.status(200).json( verifying )
    } catch (error) {
        // response.status(500).send( error )
        response.status(500).json({ error:'No se pudo procesar la solicitud de verificación', detail: error.message } )
    }
}
const controllersDeactiveUser = async (req,res) => {
    try {
        const getDeactiveUser = await getDeactiveUserService()
        if(!getDeactiveUser.length) {
            // return res.status(404).send('No se encontraron usuarios desactivados.')
            return res.status(200).json([])
        }
        res.status(200).json(getDeactiveUser)
    } catch (error) {
        res.status(500).send('No se pudo procesar la solicitud de usuarios desactivados')
    }
}

const isActiveUserControllerEmail = async ( req, res ) =>{
    try {
        let { emailUser } = req.params;
        emailUser = emailUser.trim().toLowerCase()
        const isAnActiveUser = await isActiveUserEmailService( emailUser );
        return res.status(200).json( isAnActiveUser ) 
    } catch (error) {
        return res.status(500).send( 'No se pudo procesar la solicitud' )
    }
}

module.exports = {
    controllerGetAllUsers,
    controllerRegisterUser,
    controllerGetUserById,
    controllergetUserByOnlyEmail,
    controllerModifyUser,
    controllerDeleteUser,
    controllersBlockedUser,
    controllersRestoreUser,
    controllerGetUserByEmail,
    controllerGetToken,
    controllersDeactiveUser,
    isActiveUserControllerEmail
}
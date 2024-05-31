const { EntityUserAddress } = require('../../db.js')

const createAddressUser = async (idUser, {
    identifierName,
    numberAddress,
    addressName,
    postalCode,
    provinceAddress,
    cityAddress
}) => {
    const toCreate = {
    identifierName, //nombre para identificar la dirección, dado por el user
    numberAddress: `${numberAddress}`, // numero de casa calle
    addressName, // nombre calle
    postalCode: `${postalCode}`,
    provinceAddress,
    cityAddress
    }

        //Busca la dirección del usuario que coincida con el nombre de la dirección y el número dada
    let addressInfo;
    addressInfo = await EntityUserAddress.findOne({ 
        where: {
            idUser: idUser,
            addressName:toCreate.addressName,
            numberAddress: toCreate.numberAddress,
        }
    });
        // si no existen direcciones asociadas al usuario con esos datos (nombre de la calle y ), la creamos
    if( !addressInfo && addressName ){
        // Le asigna idUser a la info para crear
        toCreate.idUser = idUser
        var [addressInfoUser, userWasCreated] = await EntityUserAddress.findOrCreate({ 
            where: { 
                idUser, 
                addressName: toCreate.addressName, 
                numberAddress: toCreate.numberAddress
            }, 
            defaults: toCreate
        })
        addressInfo = addressInfoUser
        // y crea la dirección asociada al usuario
    };
    // const userAddress = addressInfoUser || addressInfo;
    return [addressInfo, userWasCreated]
};

const getFullListAddressesUser = async (idUser) => {
    const fullListAddresses = await EntityUserAddress.findAll({where:{idUser}})
    return fullListAddresses
}
const updateAddressesUser = async ( idUser, updateAddressInfo ) => {
    const fullListAddresses = await EntityUserAddress.update(
        updateAddressInfo,
        {
            where: {
                idUser
            }
        }
    )
    const updatedInfo = await EntityUserAddress.findOne({
        where:{
            idUser
        }
    })
    return updatedInfo
}

const deleteAddressesUser = async ( idAddress ) => {
    const deleted = await EntityUserAddress.destroy({ where: { idUserAddress:idAddress }})
    return !!deleted
}
module.exports = {
    createAddressUser,
    getFullListAddressesUser,
    updateAddressesUser,
    deleteAddressesUser
}
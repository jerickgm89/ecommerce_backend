const {
    getProvincesServices,
    getPostalCodeServices,
    createAddressService,
    getFullListAddressesServices,
    updateAddressUserServices,
    deleteAddressUserService

} = require('../services/addressesServices.js')

// const fullListPostalCode = require('../../api/dataPostalCode.json')
// // const provincesList = require('../../api/provinciasArgentina.json')
// // const citiesList = require('../../api/ciudadesArgentina.json')

const getProvinceControllerAddress = (request, response) => {
    const { province, department } = request.query;
    
    try {
        const address = getProvincesServices( province, department )
        response.status(200).json(address)
    } catch (error) {
        response.status(500).json({error: error.message})
    }
}
const  getPostalCodeControllerAddress = async(request, response) => {
    const { postalCode } = request.params;
    try {
        const shippingPrice = await getPostalCodeServices(postalCode)
        // console.log('shippingPrice', shippingPrice)
        response.status(200).json(shippingPrice)
    } catch (error) {
        response.status(500).json({error: error.message})
    }
}

const createControllerAddress = async (request, response) => {
    let { idUser } = request.params;
    const {
        identifierName,
        numberAddress,
        addressName,
        postalCode,
        provinceAddress,
        cityAddress,
        emailUser
    } = request.body;
    // console.log(idUser)
    try {

    if( !numberAddress || !addressName || !postalCode || !provinceAddress || !cityAddress ){
        response.status(400).json('Por favor entregue todos los datos necesarios realizar la solicitud de creación.')
    }
    const [addressInfoUser, createdUserAddress] = await createAddressService(idUser, emailUser, {
        identifierName,
        numberAddress,
        addressName,
        postalCode,
        provinceAddress,
        cityAddress,
    })
    // console.log("createee ->>", !!addressInfoUser, userWasCreated, createdUserAddress)
    // console.log("createe", request.body)
    // if(!createNewAddressUser && !created){
    //     response.status(404).json('No se pudo crear la dirección')
    // }

    if(createdUserAddress){
        return response.status(201).json(addressInfoUser)
    }
    else return response.status(200).json(addressInfoUser)
        
    } catch (error) {
        return response.status(500).json({error: error, details:error.message})
    }
}

const getAllByUserControllerAddress = async (request, response) => {
    const { idUser } = request.params;
    try {
        const addresses = await getFullListAddressesServices(idUser)
        // if(!address.length) throw new Error ('No existen elementos en addresses')
        return response.status(200).json(addresses)
    } catch (error) {
        response.status(500).json({error: error, details: error.message})
    }
}

const updateUserControllerAddress = async ( request, response) => {
    const { idAddress } = request.params;
    const {
        identifierName,
        numberAddress,
        addressName,
        postalCode,
        provinceAddress,
        cityAddress,
        country
    } = request.body
        // const response
    try {
        const updatedAddress = await updateAddressUserServices( idAddress, {
            identifierName,
            numberAddress,
            addressName,
            postalCode,
            provinceAddress,
            cityAddress,
            country})
        response.status(200).json(updatedAddress)
    } catch (error) {
        response.status(500).send({ error: error.message})
    }
}

const deleteAddressUserControllerAddress = async ( request, response) => {
    const { idAddress } = request.params;
    try {
        const successDeletedAction = await deleteAddressUserService(idAddress)
        response.status(200).json(successDeletedAction)
    } catch (error) {
        response.status(500).send({ error: error.message})
    }
    
}

module.exports ={
    getProvinceControllerAddress,
    getPostalCodeControllerAddress,
    createControllerAddress,
    getAllByUserControllerAddress,
    updateUserControllerAddress,
    deleteAddressUserControllerAddress
    // controllerGetProvinces,
    // controllerGetCity,

}
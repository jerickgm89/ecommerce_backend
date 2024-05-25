const {
    getPostalCodeServices,
    createAddressService,
    getFullListAddressesServices,
    updateAddressUserServices,
    deleteAddressUserService

} = require('../services/addressesServices.js')

const fullListPostalCode = require('../../api/dataPostalCode.json')
// const provincesList = require('../../api/provinciasArgentina.json')
// const citiesList = require('../../api/ciudadesArgentina.json')

const getControllerAddress = (request, response) => {
    const { province, city,  } = request.query;
    try {
        const address = getPostalCodeServices({ province, city }, fullListPostalCode)
        response.status(200).json(address)
    } catch (error) {
        response.status(500).json({error: error.message})
    }
}

const createControllerAddress = async (request, response) => {
    const { idUser } = request.params;
    const {
        identifierName,
        numberAddress,
        addressName,
        postalCode,
        provinceAddress,
        cityAddress,
        country
    } = request.body;
    console.log(idUser)
    
    if( !numberAddress || !addressName || !postalCode || !provinceAddress || !cityAddress ){
        response.status(400).json('Por favor entregue todos los datos necesarios realizar la solicitud de creación.')
    }
    const createNewAddressUser = await createAddressService(idUser, {
        identifierName,
        numberAddress,
        addressName,
        postalCode,
        provinceAddress,
        cityAddress,
        country
    })
    // console.log("createe", request.body)
    if(!createNewAddressUser){
        response.status(418).json('No fue posible realizar esa solicitud')
    }
    else response.status(201).json(createNewAddressUser)
    
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
    getControllerAddress,
    createControllerAddress,
    getAllByUserControllerAddress,
    updateUserControllerAddress,
    deleteAddressUserControllerAddress
    // controllerGetProvinces,
    // controllerGetCity,

}
const {
    getPostalCodeServices

} = require('../services/addressesServices.js')

const fullListPostalCode = require('../../api/dataPostalCode.json')
const provincesList = require('../../api/provinciasArgentina.json')
const citiesList = require('../../api/ciudadesArgentina.json')

const controllerAddress = (request, response) => {
    const { province, city } = request.query;
    try {
        const address = getPostalCodeServices({ province, city }, fullListPostalCode)
        response.status(200).json(address)
    } catch (error) {
        response.status(500).json({error: error.message})
    }
}
// const controllerGetProvinces = async ( require, response) => {
//     // const response
//     try {
//         const provincesFullList = await getProvincesServices(fullListPostalCode)
//         response.status(200).json(provincesFullList)
//     } catch (error) {
//         response.status(500).send({ error: error.message})
//     }
// }
// const controllerGetCity = async ( require, response) => {
//     try {
//         const cityFullList = await getCityServices(citiesList)
//         response.status(200).json(cityFullList)
//     } catch (error) {
//         response.status(500).send({ error: error.message})
//     }
    
// }

module.exports ={
    controllerAddress,
    // controllerGetProvinces,
    // controllerGetCity,

}
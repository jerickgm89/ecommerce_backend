const { 
    createAddressUser,
    getFullListAddressesUser,
    updateAddressesUser,
    deleteAddressesUser
} = require('../repository/repositoriesAddressUser.js')

const formatedResponse = (info) => {
    const arrayList = typeof info !== "string" ? Object.keys(info) : info
    const toFormat = Array.isArray(arrayList) 
    ? arrayList.map(city => city[0] + city.slice(1).toLowerCase()) 
    : arrayList[0] + arrayList.slice(1).toLowerCase()
    return toFormat
} 
const getPostalCodeServices = ({ province, city }, fullListPostalCode) => {
    
    // Retorna la ciudad seleccionada según selecciones de ciudad y provincia
    if( province && city ){
        const filterProvinceAndCity = fullListPostalCode[province][city]
        if(Object.keys(filterProvinceAndCity).length) return formatedResponse(city)
        else throw new Error ("No se encontró coincidencia")
        
    }

    // Retorna el listado de ciudades según la provincia seleccionada
    if( province && !city ){
        const filterProvince = fullListPostalCode[province]
        const citySelected = formatedResponse(filterProvince)
        return citySelected
    }

    // Retorna la ciudad seleccionada
    if ( !province && city ) {
        for(const province in fullListPostalCode){
            const toString = formatedResponse(fullListPostalCode[province][city])
            if( toString.length ) return formatedResponse(city)
        }
    }
    else {
        const listProvince = Object.keys(fullListPostalCode)
        return listProvince
    }

}
const createAddressService = async ( idUser, adressToCreate ) => {
    const addressToCreate = await createAddressUser(idUser, adressToCreate)
// const getCityServices = ({ province, city }, fullListPostalCode) => {
    return addressToCreate
}
const getFullListAddressesServices = async ( idUser ) => {
    const fullAddressesList = await getFullListAddressesUser(idUser)
// const getCityServices = ({ province, city }, fullListPostalCode) => {
    return fullAddressesList
}
const updateAddressUserServices = async ( idAddress, updateAddressInfo ) => {
    const fullAddressesList = await updateAddressesUser( idAddress, updateAddressInfo )
// const getCityServices = ({ province, city }, fullListPostalCode) => {
    return fullAddressesList
}
const deleteAddressUserService = async ( idAddress) => {
    const deletedAddress = await deleteAddressesUser( idAddress)
// const getCityServices = ({ province, city }, fullListPostalCode) => {
    return deletedAddress
}

module.exports = {
    getPostalCodeServices,
    createAddressService,
    getFullListAddressesServices,
    updateAddressUserServices,
    deleteAddressUserService
    // getCityServices
}
const { 
    createAddressUser,
    getFullListAddressesUser,
    updateAddressesUser,
    deleteAddressesUser
} = require('../repository/repositoriesAddressUser.js')
const { logInUserServices } = require('../../Users/services/userService.js')

const formatedResponse = (info) => {
    const arrayList = typeof info !== "string" ? Object.keys(info) : info
    const toFormat = Array.isArray(arrayList) 
    ? arrayList.map(city => city[0] + city.slice(1).toLowerCase()) 
    : arrayList[0] + arrayList.slice(1).toLowerCase()
    return toFormat
} 
const getPostalCodeServices = ({ provincia, departamento, municipio, barrio }, fullListPostalCode) => {
    
    // Retorna la ciudad seleccionada según selecciones de ciudad y provincia
    if( provincia && departamento ){
        const filterProvinceAndCity = fullListPostalCode[provincia][departamento]
        if(Object.keys(filterProvinceAndCity).length) return formatedResponse(departamento)
        else throw new Error ("No se encontró coincidencia")
        
    }

    // Retorna el listado de ciudades según la provincia seleccionada
    if( provincia && !departamento ){
        const filterProvince = fullListPostalCode[provincia]
        const citySelected = formatedResponse(filterProvince)
        return citySelected
    }

    // Retorna la ciudad seleccionada
    if ( !provincia && departamento ) {
        for(const province in fullListPostalCode){
            const toString = formatedResponse(fullListPostalCode[province][departamento])
            if( toString.length ) return formatedResponse(departamento)
        }
    }
    else {
        const listProvince = Object.keys(fullListPostalCode)
        return listProvince
    }

}
const createAddressService = async ( idUser, emailUser, adressToCreate ) => {
    // define el user ID por defecto como el que recibe
    try {
        if(emailUser){

            const userInfo = {
                email: emailUser
            }
            const [user, userWasCreated] = await logInUserServices(userInfo)
            idUser = user?.idUser
        }
        // else userID = idUser
        const [addressInfoUser, createdUserAddress] = await createAddressUser(idUser, adressToCreate)
        return [addressInfoUser, createdUserAddress]
    } catch (error) {
        console.error('Error al llamar a logInUserServices:', error);
        throw error;
    }
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
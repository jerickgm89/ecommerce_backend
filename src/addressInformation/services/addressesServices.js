const { 
    createAddressUser,
    getFullListAddressesUser,
    // getPostalCode,
    updateAddressesUser,
    deleteAddressesUser
} = require('../repository/repositoriesAddressUser.js')
const { logInUserServices } = require('../../Users/services/userService.js')
/*
SAN JUAN AR-J no es reconocido por la api

error: 'Provincias invalidas. Los codigos de provincia estan definidos por ISO 3166-2:AR: AR-A, AR-B, AR-C, AR-K, AR-H, AR-U, AR-X, AR-W, AR-E, AR-P, AR-Y, AR-L, AR-F, AR-M, AR-N, AR-Q, AR-R, AR-D, AR-Z, AR-S, AR-G, AR-V, AR-T'  
shippingPrice undefined
*/
const provinceList = require('../../api/provinciasArgentina.json')

const fullListPostalCode = require('../../api/dataPostalCode.json')
const fetchShippingPrice = require('../../../utils/shippingPrice.js')

const formatedResponse = (info) => {

    const arrayList = typeof info !== "string" ? Object.keys(info) : info
    const toFormat = Array.isArray(arrayList) 
    ? arrayList.map(city => city[0] + city.slice(1).toLowerCase()) 
    : arrayList[0].concat(arrayList.slice(1).toLowerCase())
    return toFormat
} 
const getProvincesServices = ( provincia, departamento ) => {
    try {
        // departamento = departamento === "null" ? departamento : departamento?.toUpperCase();
        const barrio = []
        if( provincia && departamento ){
            const filterProvinceAndCity = fullListPostalCode[provincia][departamento]
            if(Object.keys(filterProvinceAndCity).length){
                for(const city in filterProvinceAndCity){
                    barrio.push(filterProvinceAndCity[city])
                }
            }
            return barrio.reduce((acumulador, objectTownPostal) => {
                return { ...acumulador, ...objectTownPostal   }
            })
            // return barrio.reduce((acumulador, objectTownPostal) => {
            //     const listBarrio = { ...acumulador, ...objectTownPostal   }
            //     let formattedObject = {};
            //     for(const city in listBarrio){
            //         const formattedCityKey = formatedResponse(city)
            //         formattedObject[formattedCityKey] = listBarrio[city]
            //     }
            //     return formattedObject;
            // }, {})
            // }    
        }
            
        if( provincia ){
            const filterProvince = fullListPostalCode[provincia]
            if(Object.keys(filterProvince).length) return formatedResponse(filterProvince)
                else throw new Error ("No se encontró coincidencia")
        }
        else {
            const listProvince = Object.keys(fullListPostalCode)
            return listProvince
        }
    } catch (error) {
        console.error('Error al llamar a getProvincesServices:', error);
        throw error;
    }

};

const getPostalCodeServices = async (postalCode) => {
    try {
        const provinceByPostalCode = findProvinceByPostalCode(fullListPostalCode, postalCode)
        const findCodeProvince = provinceList.find( province => province.name === provinceByPostalCode)
<<<<<<< HEAD
        console.log('findCodeProvince ->   ', findCodeProvince)
        // const shippingPrice = await fetchShippingPrice(postalCode, findCodeProvince?.code31662)
        console.log('shippingPrice', shippingPrice.paqarClasico)
=======
        const shippingPrice = await fetchShippingPrice(postalCode, findCodeProvince?.code31662)
>>>>>>> 066bf7efa23b82b443edc2708eb13b446bb46987
        return shippingPrice.paqarClasico
    } catch (error) {
        console.error('Error al llamar a getPostalCodeServices:', error);
        throw error;
    }
}
const findProvinceByPostalCode = (data, postalCode) => {
    for (let province in data) {
        for (let department in data[province]) {
            for (let township in data[province][department]) {
                for (let location in data[province][department][township]) {
                    if (data[province][department][township][location] == postalCode) {
                        return province
                    }
                }
            }
        }
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
            // idUser = user?.idUser
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
    getProvincesServices,
    getPostalCodeServices,
    createAddressService,
    getFullListAddressesServices,
    updateAddressUserServices,
    deleteAddressUserService
    // getCityServices
}
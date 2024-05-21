const formatedResponse = (info) => {
    const toFormat = Object.keys(info)[0].toLowerCase()
    const response = toFormat[0].toUpperCase() + toFormat.slice(1)
    return response
} 
const getPostalCodeServices = ({ province, city }, fullListPostalCode) => {
    if( province && city ){
        const filterProvinceAndCity = fullListPostalCode[province][city]
        const citySelected = formatedResponse(filterProvinceAndCity)
        return citySelected
        
    }
    if( province && !city ){
        const filterProvince = fullListPostalCode[province]
        const citySelected = formatedResponse(filterProvince)
        return citySelected
    }
    if ( !province && city ) {
        for(const province in fullListPostalCode){
            const toString = formatedResponse(fullListPostalCode[province][city])
                return toString
        }
    }
    else {
        const listProvince = Object.keys(fullListPostalCode)
        return listProvince
    }

}
const getProvincesServices = ( { province, city }, fullListPostalCode ) => {
    // province ?
}
const getCityServices = ({ province, city }, fullListPostalCode) => {

}

module.exports = {
    getPostalCodeServices,
    getProvincesServices,
    getCityServices
}
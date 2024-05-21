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
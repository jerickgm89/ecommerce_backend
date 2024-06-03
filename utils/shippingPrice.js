
const fetchShippingPrice = async (postalCode, provinceCode) => {

    // console.log('postalCode', postalCode, 'provinceCode', provinceCode);
    const url = 'https://correo-argentino1.p.rapidapi.com/calcularPrecio';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '479428dffamsh601882b59eb056ap16f9b1jsn4ec03f3f5424',
            'x-rapidapi-host': 'correo-argentino1.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cpOrigen: '2132',
            cpDestino: `${postalCode}`,
            provinciaOrigen: 'AR-S',
            provinciaDestino: provinceCode,
            peso: '10'
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        // console.log('result   ->', result);
        return result
    } catch (error) {
        console.error(error);
    }
}

module.exports = fetchShippingPrice;
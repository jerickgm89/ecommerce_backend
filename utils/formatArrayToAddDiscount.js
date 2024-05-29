const formatArrayToAddDiscount = async ( idProduct ) => {
    const idProductList = idProduct.split(',')
    return idProductList
};

module.exports = formatArrayToAddDiscount;
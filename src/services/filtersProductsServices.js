const { filtersProducts } = require('../Products/repositories/reporitoriesFiltersAndOrder/filtersProducts.js')

const filtersProductsServices = (properties, limit, offset, order) => {
    const resultFilters = filtersProducts(properties, limit, offset, order)
    return resultFilters
}

module.exports = {
    filtersProductsServices
}
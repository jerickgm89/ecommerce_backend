const { filtersProducts } = require('../../repositories/repositoriesFiltersAndOrder/filtersProducts.js')
// const formatterArray = require('../../../../utils/formatterArray.js')

const filtersProductsServices = (properties, limit, offset, order) => {
    
    const resultFilters = filtersProducts(properties, limit, offset, order)

    return resultFilters
}

module.exports = {
    filtersProductsServices
}
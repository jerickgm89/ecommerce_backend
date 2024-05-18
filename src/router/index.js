const { Router } = require('express')

//                          ----> Users <-----<
const routesUsers = require('./../Users/routes/routesUsers.js')

//                          ----> Products <-----<
const routesProducts = require('./../Products/routes/index.js')

//                           ----> filtres and order <----
const routesFiltersProducts = require('../Products/routes/filtersAndOrder/routesFiltersProducts.js')

//
const routesShopping = require("../Shopping/routes/index.js")

const router = () => {
    const routers = Router()
    routers.use('/products', routesProducts)
    routers.use('/filterproducts', routesFiltersProducts)
    routers.use('/shop', routesShopping)

    return routers
}

const auth_router = () => {
    const routers = Router()
    routers.use('/users', routesUsers)
    return routers
}

module.exports = {
    router: router(), // Llamar a la función y exportar el resultado
    auth_router: auth_router() // Llamar a la función y exportar el resultado
};
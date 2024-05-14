//                          ----> Users <-----
const { Router } = require('express')
const routesUsers = require('./../Users/routes/routesUsers.js')
const routesProducts = require('./../Products/routes')

const routesFiltersProducts = require('../products/routes/routesFiltersProducts/routesFiltersProducts.js')
const routesFiltersBrand = require('../products/routes/routesFiltersBrand/routesFilterBrand.js')
const routesFiltersCategory = require('../products/routes/routesFiltersCategory/routesFiltersCategory.js')




const router = () => {
    const routers = Router()
    // Agregar aquí la ruta a users
    
    //                          ----> Products <-----
    routers.use('/products', routesProducts)
    routers.use('/filterproducts', routesFiltersProducts)
    routers.use('/filterbrand', routesFiltersBrand)
    routers.use('/filtercategory', routesFiltersCategory)
      
    return routers
}

//                           ----> filtres and order <----

const auth_router = () => {
    const routers = Router()
    routers.use('/users', routesUsers)
    return routers
}

module.exports = {
    router: router(), // Llamar a la función y exportar el resultado
    auth_router: auth_router() // Llamar a la función y exportar el resultado
};










// const {Router} = require('express')

// const routesUsers = require('./../Users/routes/routesUsers.js')
// const routesAuth = require('./../Auth/routes/routesAuth.js')

// const router = Router()

// router.use('/users', routesUsers)


// router.use('/authentication', routesAuth)




// module.exports = {router}
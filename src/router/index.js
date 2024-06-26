const { Router } = require('express')

//                               ----> Usuarios <-----<
const routesUsers = require('./../Users/routes/routesUsers.js')
//                              ----> Productos <-----<
const routesProducts = require('./../Products/routes/index.js')
//                              ----> filtros y ordenamiento productos <----
const routesFiltersProducts = require('../Products/routes/filtersAndOrder/routesFiltersProducts.js')
//                              ---->  <----
const routesShopping = require("../Shopping/routes/index.js")
//                              ----> Pago en plataforma y estado pedido <----
const paymentRoutes = require('../payments/routes/paymentRoutes.js');
//                              ----> Direcciones de usuarios y entrega de código postal <----
const addressesRoutes = require('../addressInformation/routes/addressInformationRoutes.js');
//                              ----> Ruta en '/' README.md <----
const readmeEmptyPath = require('../../utils/emptyPath.js')

//                                  ----> Reviews <----

const reviewRoutes = require('../review/routesReview/reviewRutes.js')
//                                  ----> comments <----

const commentsRoutes = require('../comments/routesComments/commentsRoutes.js')
//
const incomeRouter = require('../dashboards/routes/incomeRoutes/incomeRoutes.js');

//                                  ----> Coupons <----
const couponRoutes = require('../coupons/routes/couponRoutes.js')

const router = () => {
    const routers = Router()
    routers.use('/', readmeEmptyPath)
    routers.use('/products', routesProducts)
    routers.use('/filterproducts', routesFiltersProducts)
    routers.use('/shop', routesShopping)
    routers.use('/payment', paymentRoutes);
    routers.use('/address', addressesRoutes)
    routers.use('/reviews', reviewRoutes)
    routers.use('/comments', commentsRoutes)
    routers.use('/coupons', couponRoutes)
    routers.use('/dash', incomeRouter);
    return routers
}

const auth_router = () => {
    const routers = Router()
    routers.use('/users', routesUsers)
    // routers.use('/auth', routesAuth)
    return routers
}

module.exports = {
    router: router(), // Llamar a la función y exportar el resultado
    auth_router: auth_router() // Llamar a la función y exportar el resultado
};
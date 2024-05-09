
const {Router} = require('express')
const routesUsers = require('./../Users/routes/routesUsers.js')
const productsRoutes = require('./src/router/products/routeProducts.js');

const router = Router()

router.use('/users', routesUsers)
router.use('/products', productsRoutes);


module.exports = router;
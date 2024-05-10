
const {Router} = require('express')
const routesUsers = require('./../Users/routes/routesUsers.js')
const brandRoutes = require('./brandRoutes');
const categoryRoutes = require('./categoryRoutes.js');
const productRoutes = require('./productRoutes.js');
// const characteristicsRoutes = require('./characterProducts'); // Importamos las rutas de las características de los productos



const router = Router()

router.use('/users', routesUsers)
router.use('/brands', brandRoutes);
router.use('/products', productRoutes);
router.use('/category', categoryRoutes);
// router.use('/characters', characteristicsRoutes);



module.exports = router;
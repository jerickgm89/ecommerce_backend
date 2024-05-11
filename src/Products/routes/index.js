const brandRoutes = require('./brand/brandRoutes.js');
const categoryRoutes = require('./category/categoryRoutes.js');
const productRoutes = require('./product/productRoutes.js');

// const characteristicsRoutes = require('./characterProducts'); // Importamos las rutas de las características de los productos

const router = require("express").Router()

router.use('/index', productRoutes);
router.use('/brands', brandRoutes);
router.use('/category', categoryRoutes);
// router.use('/characters', characteristicsRoutes);

module.exports = router;
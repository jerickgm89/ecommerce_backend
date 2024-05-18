const orderItemRoutes = require('./order/orderItemRoutes');
const detailsRoutes = require('./details/detailsRoutes')
const paymentRoutes = require('./payment/paymentRoutes')
const router = require("express").Router();

router.use('/order', orderItemRoutes);
router.use('/details', detailsRoutes)
router.use('/payment', paymentRoutes)


module.exports = router;


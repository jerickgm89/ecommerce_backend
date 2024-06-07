const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');
const applyCouponController = require('../controllers/applyCouponController');

router.post('/', couponController.createCoupon);
router.put('/:id', couponController.updateCoupon);
router.delete('/:id', couponController.deleteCoupon);
router.get('/', couponController.listCoupons);
router.post('/apply-coupon', applyCouponController.applyCoupon);

module.exports = router;

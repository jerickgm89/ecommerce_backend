const express = require('express');
const router = express.Router();
const { createCoupon, editCoupon, deleteCoupon, listCoupons } = require('../controllers/couponController');

router.post('/create', createCoupon);
router.put('/edit/:id', editCoupon);
router.delete('/delete/:id', deleteCoupon);
router.get('/list', listCoupons);

module.exports = router;

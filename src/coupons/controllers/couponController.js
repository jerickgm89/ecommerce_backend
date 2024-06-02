const Coupon = require('../models/couponModel');

const createCoupon = async (req, res) => {
    try {
        const { code, discountPercentage, expirationDate } = req.body;
        const coupon = await Coupon.create({ code, discountPercentage, expirationDate });
        res.status(201).json(coupon);
    } catch (error) {
        console.error('Error creating coupon:', error.message);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

const updateCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const { code, discountPercentage, expirationDate } = req.body;
        const coupon = await Coupon.findByPk(id);

        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }

        coupon.code = code;
        coupon.discountPercentage = discountPercentage;
        coupon.expirationDate = expirationDate;
        await coupon.save();

        res.status(200).json(coupon);
    } catch (error) {
        console.error('Error updating coupon:', error.message);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

const deleteCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const coupon = await Coupon.findByPk(id);

        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }

        await coupon.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting coupon:', error.message);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

const listCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.findAll();
        res.status(200).json(coupons);
    } catch (error) {
        console.error('Error listing coupons:', error.message);
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

module.exports = { createCoupon, updateCoupon, deleteCoupon, listCoupons };

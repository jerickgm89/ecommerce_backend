const { Coupon, CouponUsage } = require('../../db');

exports.applyCoupon = async (req, res) => {
  try {
    const { userId, couponCode, products } = req.body;
    const coupon = await Coupon.findOne({ where: { code: couponCode } });

    if (!coupon) {
      return res.status(400).json({ error: 'Invalid coupon code' });
    }

    const now = new Date();
    if (now < coupon.validFrom || now > coupon.validUntil) {
      return res.status(400).json({ error: 'Coupon is not valid at this time' });
    }

    const couponUsage = await CouponUsage.findOne({ where: { userId, couponId: coupon.idCoupon } });
    if (couponUsage) {
      return res.status(400).json({ error: 'Coupon has already been used by this user' });
    }

    const applicableProducts = products.filter(product => product.brandId === coupon.brandId);
    if (applicableProducts.length === 0) {
      return res.status(400).json({ error: 'Coupon is not applicable to these products' });
    }

    const discountAmount = applicableProducts.reduce((total, product) => {
      return total + (product.price * (coupon.discountPercentage / 100));
    }, 0);

    const totalAmount = products.reduce((total, product) => total + product.price, 0);
    const totalWithDiscount = totalAmount - discountAmount;

    // Registrar el uso del cupón por el usuario
    await CouponUsage.create({ userId, couponId: coupon.idCoupon });

    res.status(200).json({ discountAmount, totalWithDiscount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
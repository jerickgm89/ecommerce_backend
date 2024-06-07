const { Coupon,  CouponUsage, EntityProducts } = require('../../db');

exports.applyCoupon = async (req, res) => {
  try {
    const { userId, couponCode, products } = req.body;

    // Buscar el cupón
    const coupon = await Coupon.findOne({ where: { code: couponCode } });

    if (!coupon) {
      return res.status(400).json({ error: 'Invalid coupon code' });
    }

    // Validar la vigencia del cupón
    const now = new Date();
    if (now < coupon.validFrom || now > coupon.validUntil) {
      return res.status(400).json({ error: 'Coupon is not valid at this time' });
    }

    // Verificar si el cupón ya fue usado por el cliente
    const usage = await CouponUsage.findOne({ where: { userId, couponId: coupon.idCoupon } });
    if (usage) {
      return res.status(400).json({ error: 'Coupon already used by this user' });
    }

    // Filtrar productos por idBrand
    const applicableProducts = products.filter(product => product.brandId === coupon.brandId);
    if (applicableProducts.length === 0) {
      return res.status(400).json({ error: 'Coupon is not applicable to these products' });
    }

    // Calcular el descuento
    const discountAmount = applicableProducts.reduce((total, product) => {
      return total + (product.price * (coupon.discountPercentage / 100));
    }, 0);

    const totalAmount = products.reduce((total, product) => total + product.price, 0);
    const totalWithDiscount = totalAmount - discountAmount;

    res.status(200).json({ discountAmount, totalWithDiscount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
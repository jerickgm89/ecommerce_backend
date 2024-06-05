const { Coupon, CouponUsage } = require('../../db');
const { v4: uuidv4 } = require('uuid');

// Función para generar códigos de cupones (aunque usaremos un código común para este caso)
function generateCouponCode() {
  return uuidv4().replace(/-/g, '').slice(0, 11);
}

// Crear un nuevo cupón
exports.createCoupon = async (req, res) => {
  try {
    const { name, discountPercentage, validFrom, validUntil, brandId } = req.body;
    const code = generateCouponCode();
    const coupon = await Coupon.create({ code, name, discountPercentage, validFrom, validUntil, brandId });
    res.status(201).json(coupon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Modificar un cupón existente
exports.updateCoupon = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, discountPercentage, validFrom, validUntil, brandId } = req.body;
  
      const coupon = await Coupon.findByPk(id);
      if (!coupon) {
        return res.status(404).json({ error: 'Coupon not found' });
      }
  
      await coupon.update({ name, discountPercentage, validFrom, validUntil, brandId });
      res.status(200).json(coupon);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  // Listar todos los cupones
exports.listCoupons = async (req, res) => {
    try {
      const coupons = await Coupon.findAll();
      res.status(200).json(coupons);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  // Eliminar un cupón existente
exports.deleteCoupon = async (req, res) => {
    try {
      const { id } = req.params;
  
      const coupon = await Coupon.findByPk(id);
      if (!coupon) {
        return res.status(404).json({ error: 'Coupon not found' });
      }
  
      await coupon.destroy();
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Aplicar un cupón

  
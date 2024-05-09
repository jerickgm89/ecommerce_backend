const { Router } = require('express');
const {
  createProduct,
  updateProduct,
  deleteProduct,
  pauseProduct,
  getProductsBrief,
  getProductDetails
} = require('./src/controllers/productsController.js');

const router = Router();

router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.patch('/:id/pause', pauseProduct);
router.get('/', getProductsBrief);
router.get('/:id', getProductDetails);

module.exports = router;

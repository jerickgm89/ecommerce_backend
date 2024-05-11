const express = require('express');
const {
  createProductAndCharacteristics,
  updateProductAndCharacteristics,
  getAllProducts,
  getProductById,
  getProductByName,
  deleteProductAndCharacteristics
} = require('../../controllers/product/productController.js');

const router = express.Router();

router.post('/', createProductAndCharacteristics);
router.patch('/:id', updateProductAndCharacteristics);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.get('/name/:name', getProductByName);
router.delete('/:id', deleteProductAndCharacteristics);



module.exports = router;

const express = require('express');


const upload = require('../../../configCloudinary.js')
const cloudinary = require('cloudinary')

const {
  createProductAndCharacteristics,
  updateProductAndCharacteristics,
  getAllProducts,
  getProductById,
  getProductByName,
  deleteProductAndCharacteristics,
  unlockProduct,
  restoreProduct,
  getDeactivatedProducts
} = require('../../controllers/product/productController.js');

const router = express.Router();

router.post('/', upload.array('imageProducts',10),createProductAndCharacteristics);
// router.post('/', upload.single('imageProducts'),createProductAndCharacteristics);
router.patch('/:id', updateProductAndCharacteristics);
router.get('/', getAllProducts);
router.get('/search', getProductByName);
router.get('/deactivate', getDeactivatedProducts)
router.get('/:id', getProductById);
router.delete('/:id', deleteProductAndCharacteristics);
router.delete('/unlock/:id', unlockProduct)
router.delete('/restore/:id', restoreProduct);


module.exports = router;

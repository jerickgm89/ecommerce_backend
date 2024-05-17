const express = require('express');


const upload = require('../../../configCloudinary.js')
const cloudinary = require('cloudinary')

const {
  createProductAndCharacteristics,
  updateProductAndCharacteristics,
  getAllProducts,
  getProductById,
  getProductByName,
  deleteProductAndCharacteristics
} = require('../../controllers/product/productController.js');

const router = express.Router();

router.post('/', upload.single('imageProducts'),createProductAndCharacteristics);
router.patch('/:id', updateProductAndCharacteristics);
router.get('/', getAllProducts);
router.get('/search', getProductByName);
router.get('/:id', getProductById);
router.delete('/:id', deleteProductAndCharacteristics);



module.exports = router;

const express = require('express');


const upload = require('../../../configCloudinary.js')
const cloudinary = require('cloudinary')
const  {
   createProductControllers,
   GetProductByIdControllers,
   updateProductCharacteristicsControllers,
   deleteProductCharacteristicsControllers,
   getAllProductsControllers,
   searchProductsControllers, 
   blockedProductControllers,
   restoreProductControllers,
  getDeactivatedProductsControllers} = require('../../controllers/controllersProducts/productsControllers.js')


const router = express.Router();

router.post('/', upload.array('imageProducts',10), createProductControllers);
// router.post('/', upload.single('imageProducts'),createProductAndCharacteristics);
router.patch('/:id', upload.array('imageProducts',10), updateProductCharacteristicsControllers);
router.get('/', getAllProductsControllers);
router.get('/search', searchProductsControllers);
router.get('/deactivate', getDeactivatedProductsControllers)
router.get('/:id', GetProductByIdControllers);
router.delete('/:id', deleteProductCharacteristicsControllers);
router.delete('/unlock/:id', blockedProductControllers)
router.delete('/restore/:id', restoreProductControllers);


module.exports = router;

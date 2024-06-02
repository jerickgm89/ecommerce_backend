const express = require('express');
const {
    getAllBrandsController,
    getBrandByNameController,
    createBrandController,
    updateBrandController,
    deleteBrandController,
    getBrandByIdController
} = require('../../controllers/controllerBrands/brandControllers.js');
const upload = require('../../../configCloudinary.js')

const router = express.Router();

router.post('/', upload.single('logoBrand'), createBrandController);
router.get('/', getAllBrandsController);
router.get('/name/:brandName', getBrandByNameController);
router.get('/:idBrand', getBrandByIdController);
router.put('/:idBrand', upload.single('logoBrand'),  updateBrandController);
router.delete('/:idBrand', deleteBrandController);

module.exports = router;

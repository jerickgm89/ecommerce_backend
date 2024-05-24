const express = require('express');
const {
    getAllBrands,
    getBrandByName,
    createBrand,
    updateBrand,
    deleteBrand
} = require('../../controllers/controllerBrands/brandControllers.js');
const upload = require('../../../configCloudinary.js')

const router = express.Router();

router.post('/', upload.single('logoBrand'), createBrand);
router.get('/', getAllBrands);
router.get('/name/:brandName', getBrandByName);
router.put('/:idBrand', upload.single('logoBrand'),  updateBrand);
router.delete('/:idBrand', deleteBrand);

module.exports = router;

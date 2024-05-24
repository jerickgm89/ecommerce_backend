const express = require('express');
const {
    getAllBrands,
    getBrandByName,
    createBrand,
    updateBrand,
    deleteBrand
} = require('../../controllers/brand/brandController.js');
const upload = require('../../../configCloudinary.js')

const router = express.Router();

router.post('/', upload.single('logoBrand'), createBrand);
router.get('/', getAllBrands);
router.get('/name/:brandName', getBrandByName);
router.put('/:id', upload.single('logoBrand'),  updateBrand);
router.delete('/:id', deleteBrand);

module.exports = router;

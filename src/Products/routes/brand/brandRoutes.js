const express = require('express');
const {
    getAllBrands,
    getBrandByName,
    createBrand,
    updateBrand,
    deleteBrand
} = require('../../controllers/brand/brandController.js');

const router = express.Router();

router.post('/', createBrand);
router.get('/', getAllBrands);
router.get('/name/:brandName', getBrandByName);
router.put('/:id', updateBrand);
router.delete('/:id', deleteBrand);

module.exports = router;

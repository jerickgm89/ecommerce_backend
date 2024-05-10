const express = require('express');
const {
    getAllBrands,
    getBrandByName,
    createBrand,
    updateBrand,
    deleteBrand
} = require('../controllers/brandController');

const router = express.Router();

router.post('/', createBrand);
router.put('/:id', updateBrand);
router.get('/name/:name', getBrandByName);
router.get('/', getAllBrands);
router.delete('/:id', deleteBrand);

module.exports = router;

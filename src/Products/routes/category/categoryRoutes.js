const express = require('express');
const {
    getAllCategories,
    getCategoryByName,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../../controllers/category/categoryController.js'); 
const upload = require('../../../configCloudinary.js')

const router = express.Router();

router.post('/', upload.single('imageCategory'), createCategory);
router.get('/', getAllCategories);
router.get('/name/:name', getCategoryByName);
router.put('/:id', upload.single('imageCategory'), updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;

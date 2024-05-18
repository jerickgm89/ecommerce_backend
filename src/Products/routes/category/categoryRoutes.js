const express = require('express');
const {
    getAllCategories,
    getCategoryByName,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../../controllers/category/categoryController.js'); 

const router = express.Router();

router.post('/', createCategory);
router.get('/', getAllCategories);
router.get('/name/:name', getCategoryByName);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;

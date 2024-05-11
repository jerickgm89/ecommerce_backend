const express = require('express');
const {
    getAllCategories,
    getCategoryByName,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../../../controllers/categoryController'); 

const router = express.Router();

router.get('/', getAllCategories);
router.get('/name/:name', getCategoryByName);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;

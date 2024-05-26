const express = require('express');
const {
    getAllCategories,
    getCategoryByName,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../../controllers/controllerCategory/categoryController.js'); 
const upload = require('../../../configCloudinary.js')

const router = express.Router();

router.post('/', upload.single('imageCategory'), createCategory);
router.get('/', getAllCategories);
router.get('/name/:name', getCategoryByName);
router.put('/:idCategory', upload.single('imageCategory'), updateCategory);
router.delete('/:idCategory', deleteCategory);

module.exports = router;

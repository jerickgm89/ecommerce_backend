const express = require('express');
const {
    getAllCategoriesController,
    getCategoryByNameController,
    createCategoryController,
    updateCategoryController,
    deleteCategoryController,
    getCategoryByIdController
} = require('../../controllers/controllerCategory/categoryController.js'); 
const upload = require('../../../configCloudinary.js')

const router = express.Router();

router.post('/', upload.single('imageCategory'), createCategoryController);
router.get('/', getAllCategoriesController);
router.get('/name/:name', getCategoryByNameController);
router.get('/:idCategory', getCategoryByIdController);
router.put('/:idCategory', upload.single('imageCategory'), updateCategoryController);
router.delete('/:idCategory', deleteCategoryController);

module.exports = router;

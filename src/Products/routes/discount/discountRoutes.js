const express = require('express');
const {
    createDiscountController,
    getDiscountByProductController,
    getDiscountByNameController,
    getDiscountByIdController,
    updateDiscountController,
    updateDiscountByGroupController,
    deleteDiscountController
} = require('../../controllers/controllerDiscounts/discountControllers.js');

const router = express.Router();

router.post('/single/:idProduct', createDiscountController); // crea un descuento simple
router.post('/group/', createDiscountController); // crea un descuento de grupo
router.get('/:idProduct', getDiscountByProductController); // trae todos los descuentos relacionados al producto según idProduct
router.get('/name/:name', getDiscountByNameController); // busca según nombre de descuento sin importar mayúsculas
router.get('/both/:idDiscount', getDiscountByIdController); // obtiene el descuento según idDiscount
router.put('/single/:idDiscount', updateDiscountController); //modifica los descuentos de un dscto simple
router.put('/group/:idDiscount', updateDiscountByGroupController); // modifica los dsctos en grupo
router.delete('/both/:idDiscount', deleteDiscountController); // modifica los

module.exports = router;

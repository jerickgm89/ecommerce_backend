const express = require('express');
const {
    createDiscountController,
    getDiscountByProductController,
    getDiscountByNameController,
    getDiscountByIdController,
    getAllGroupOfDiscountController,
    updateDiscountController,
    // updateDiscountByGroupController,
    deleteDiscountController
} = require('../../controllers/controllerDiscounts/discountControllers.js');

const router = express.Router();

router.post('/both/:idProduct', createDiscountController); // crea un descuento simple // crea un descuento de grupo
router.get('/:idProduct', getDiscountByProductController); // trae todos los descuentos relacionados al producto según idProduct
router.get('/name/:name', getDiscountByNameController); // busca según nombre de descuento sin importar mayúsculas
router.get('/both/:idDiscount', getDiscountByIdController); // obtiene el descuento según idDiscount
router.get('/group/:idDiscount', getAllGroupOfDiscountController); // obtiene todos los descuentos de grupo
router.put('/simple/:idDiscount', updateDiscountController); //modifica los descuentos de un dscto simple  // modifica los dsctos en grupo
router.delete('/both/:idDiscount', deleteDiscountController); // modifica los
// router.put('/group/:idDiscount', updateDiscountByGroupController); 

module.exports = router;

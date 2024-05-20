const express = require('express');
const { getPayment, createPayment, updatePayment, deletePayment } = require('../../controllers/payment/paymentControllers');
const router = express.Router();

router.get('/', getPayment);
router.post('/', createPayment);
router.put('/:id', updatePayment);
router.delete('/:id', deletePayment);

module.exports = router;

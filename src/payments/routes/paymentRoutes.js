// src/api/routes/paymentRoutes.js
const express = require('express');
const paymentController = require('../controllers/paymentController');
const orderDetailController = require('../../Shopping/controllers/details/detailsControllers');
const router = express.Router();

router.post('/webhook', paymentController.webhook);
router.post('/create_order', paymentController.createOrder);
router.get('/', paymentController.getPayment);
router.put('/:id', paymentController.updatePayment);
router.delete('/:id', paymentController.deletePayment);

router.get('/total_revenue', orderDetailController.getTotalRevenue);

module.exports = router;

// src/api/routes/paymentRoutes.js
const express = require('express');
const paymentController = require('../controllers/paymentController');
const router = express.Router();

router.post('/webhook', paymentController.webhook);
router.post('/create_order', paymentController.createOrder);
router.get('/', paymentController.getPayment);
router.put('/:id', paymentController.updatePayment);
router.delete('/:id', paymentController.deletePayment);
router.get('/shipments', paymentController.getAllShipments)
router.put('/shipments/:id', paymentController.updateShipment)
router.delete('/shipments/:id', paymentController.deleteShipment)


module.exports = router;

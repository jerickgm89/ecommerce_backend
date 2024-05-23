// src/api/routes/paymentRoutes.js
const express = require('express');
const paymentController = require('../controllers/paymentController');
const router = express.Router();

router.post('/webhook', paymentController.webhook);
router.post('/create_order', paymentController.createOrder);


module.exports = router;

// src/api/routes/paymentRoutes.js
const express = require('express');
const { createOrder, receiveWebhook } = require('../controllers/paymentController');
const router = express.Router();

router.post('/create_order', createOrder);
router.post('/webhook', receiveWebhook);


module.exports = router;

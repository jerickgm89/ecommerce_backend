const express = require('express');
const { getOrderItems, createOrderItems, updateOrderItems, deleteOrderItems  } = require('../../controllers/order/orderControllers');
const router = express.Router();

router.get('/', getOrderItems);
router.post('/', createOrderItems);
router.put('/:id', updateOrderItems);
router.delete('/:id', deleteOrderItems);

module.exports = router;

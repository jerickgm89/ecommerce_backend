const express = require('express');
const { getOrderItems,  updateOrderItems, deleteOrderItems, getOrderItemsByValue, getOrderItemsByStatus  } = require('../../controllers/order/orderControllers');
const router = express.Router();

router.get('/', getOrderItems);
router.get('/filter', getOrderItemsByValue);
router.get('/status/:status', getOrderItemsByStatus);
// router.post('/', createOrderItems);
router.put('/:id', updateOrderItems);
router.delete('/:id', deleteOrderItems);

module.exports = router;

const express = require('express');
const { getOrderItems,  updateOrderItems, deleteOrderItems, getOrderItemsByValue, getOrderItemsByStatus, getOrderDetailsByUser, getOrderDetailsByOperation, getOrderDetailsByStatus } = require('../../controllers/order/orderControllers');
const router = express.Router();

router.get('/', getOrderItems);
router.get('/filter', getOrderItemsByValue);
router.get('/status/:status', getOrderItemsByStatus);
// router.post('/', createOrderItems);
router.put('/:id', updateOrderItems);
router.delete('/:id', deleteOrderItems);
router.get('/user/:idUser', getOrderDetailsByUser);
router.get('/operation/:operation', getOrderDetailsByOperation);
router.get('/oderStatus/:status', getOrderDetailsByStatus);


module.exports = router;

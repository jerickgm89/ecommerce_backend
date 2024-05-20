const express = require('express');
const { getDetails, createOrderDetail, updateOrderDetails, deleteOrderDetails } = require('../../controllers/details/detailsControllers');
const router = express.Router();

router.get('/', getDetails);
router.post('/', createOrderDetail);
router.put('/:UUID', updateOrderDetails)
router.delete('/:UUID', deleteOrderDetails)

module.exports = router;

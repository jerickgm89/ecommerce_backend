const express = require('express');
const { getDetails, createOrderDetail } = require('../../controllers/details/detailsControllers');
const router = express.Router();

router.get('/', getDetails);
router.post('/', createOrderDetail);

module.exports = router;

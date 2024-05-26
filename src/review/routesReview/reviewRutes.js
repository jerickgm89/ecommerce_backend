const express = require('express');

const {
    createReviewControllers,
    findAllReviewControllers,

} = require('../controllersReview/reviewControllers');

const router = express.Router();

router.post('/', createReviewControllers)
router.get('/', findAllReviewControllers)

module.exports = router;
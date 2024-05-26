const express = require('express');

const {
    createReviewControllers,
    findAllReviewControllers,
    reviewByIdControllers
} = require('../controllersReview/reviewControllers');


const router = express.Router();

router.post('/', createReviewControllers)
router.get('/', findAllReviewControllers)
router.get('/:id', reviewByIdControllers)

module.exports = router;
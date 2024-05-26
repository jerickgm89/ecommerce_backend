const express = require('express');

const {
    createReviewControllers,
    findAllReviewControllers,
    findReviewByProductControllers,
    findReviewByUserControllers,
    updateReviewControllers,
    deleteReviewControllers,
} = require('../controllersReview/reviewControllers');

const router = express.Router();

router.post('/', createReviewControllers);
router.get('/', findAllReviewControllers);
router.get('/product/:idProduct', findReviewByProductControllers);
router.get('/user/:idUser', findReviewByUserControllers);
router.put('/:id', updateReviewControllers);
router.delete('/:id', deleteReviewControllers);

module.exports = router;

const express = require('express');

const {
    createReviewControllers,
    findAllReviewControllers,
    findReviewByProductControllers,
    findReviewByUserControllers,
    findReviewByIdControllers,
    updateReviewControllers,
    deleteReviewControllers,
} = require('../controllersReview/reviewControllers');

const router = express.Router();

router.post('/', createReviewControllers);
router.get('/', findAllReviewControllers);
router.get('/product/:idProduct', findReviewByProductControllers);
router.get('/user/:idUser', findReviewByUserControllers);
router.get('/:idReview', findReviewByIdControllers);
router.put('/:id', updateReviewControllers);
router.delete('/:id', deleteReviewControllers);

module.exports = router;

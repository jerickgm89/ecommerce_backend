const express = require('express');

const {
    createReviewControllers,
    findAllReviewControllers,
    findReviewByProductControllers,
    findReviewByUserControllers,
    updateReviewControllers,
    deleteReviewControllers,
    deactivedReviewControllers,
    restoreReviewControllers,
    getInactiveReviewControllers
} = require('../controllersReview/reviewControllers');

const router = express.Router();

router.post('/', createReviewControllers);
router.get('/', findAllReviewControllers);
router.get('/deactived', getInactiveReviewControllers)
router.get('/product/:idProduct', findReviewByProductControllers);
router.get('/user/:idUser', findReviewByUserControllers);
router.put('/:id', updateReviewControllers);
router.delete('/:id', deleteReviewControllers);
router.delete('/deactive/:id', deactivedReviewControllers)
router.delete('/restore/:id', restoreReviewControllers)

module.exports = router;

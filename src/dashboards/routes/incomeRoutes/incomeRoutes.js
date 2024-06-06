// const express = require('express');
// const incomeControllers = require('../../controllers/incomeCOntrollers/incomeControllers');
// const router = express.Router();

// router.get('/total_revenue', incomeControllers.getTotalRevenue);
// router.get('/:reviewId/products', incomeControllers.findProductsByReviewIdControllers);
// router.get('/average-score', incomeControllers.getAverageScoreByProductControllers);
// router.get('/last-registred', incomeControllers.getregistredControllers)

// module.exports = router;

// routes/incomeRoutes.js

const express = require('express');
const incomeControllers = require('../../controllers/incomeControllers/incomeControllers');
const router = express.Router();

router.get('/total_revenue', incomeControllers.getTotalRevenue);
router.get('/:reviewId/products', incomeControllers.findProductsByReviewIdControllers);
router.get('/average-score', incomeControllers.getAverageScoreByProductControllers);
router.get('/last-registred', incomeControllers.getregistredControllers);
router.get('/top-selling', incomeControllers.getTopSellingProducts);

module.exports = router;

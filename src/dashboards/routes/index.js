const express = require("express");
const incomeRoutes = require('./incomeRoutes/incomeRoutes.js');

const router = express.Router();

router.use('/income', incomeRoutes);

module.exports = router
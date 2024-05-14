const express = require('express')

const {filterAndOrderBrand} = require('../../../Products/filtersAndOrder/filterAndOrderBrands/filterAndOrderBrand.js')

const router = express.Router()

router.get('/', filterAndOrderBrand)

module.exports = router
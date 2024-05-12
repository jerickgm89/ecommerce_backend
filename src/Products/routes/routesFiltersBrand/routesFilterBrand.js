const express = require('express')

const {filterAndOrderBrand} = require('../../filtersAndOrder/filterAndOrderBrands/filterAndOrderBrand')

const router = express.Router()

router.get('/', filterAndOrderBrand)

module.exports = router
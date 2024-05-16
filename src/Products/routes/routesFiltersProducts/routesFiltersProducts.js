const express = require('express')

const {filtersProducts} = require('../../filtersAndOrderProducts/filtersProducts.js')

const router = express.Router()

router.get('/', filtersProducts)


module.exports = router
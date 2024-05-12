const express = require('express')

const {filtersProducts} = require('../../filtersAndOrder/filtersAndOrderProducts/filtersProducts')

const router = express.Router()

router.get('/', filtersProducts)


module.exports = router
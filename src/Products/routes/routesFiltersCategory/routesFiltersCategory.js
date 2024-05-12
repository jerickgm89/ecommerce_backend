const express = require('express')

const {filterAndOrderCategory} = require('../../filtersAndOrder/filtersAndOrderCategory/filtersAndOrderCategory')

const router = express.Router()

router.get('/', filterAndOrderCategory)


module.exports = router
const express = require('express')

const {filtersProductsController} = require('../../filtersAndOrderProducts/filtersProductsControllers.js')

const router = express.Router()

router.get('/', filtersProductsController)


module.exports = router
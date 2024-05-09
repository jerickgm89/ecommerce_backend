
const {Router} = require('express')

const routesUsers = require('./../Users/routes/routesUsers.js')

const router = Router()

router.use('/users', routesUsers)

module.exports = router;
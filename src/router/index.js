const {Router} = require('express')

const routesUsers = require('./../Users/routes/routesUsers.js')
const routesAuth = require('./../Auth/routes/routesAuth.js')

const router = () => {
    const routers = Router()
    // agregar acá la ruta a products
    routers.use('/users', routesUsers)
}

const auth_router = () =>{
    const routers = Router()
    routers.use('/authentication', routesAuth)
    
}



module.exports = {
    router,
    auth_router
};
const { Router } = require('express')

const routesUsers = require('./../Users/routes/routesUsers.js')
const routesAuth = require('./../Auth/routes/routesAuth.js')

const router = () => {
    const routers = Router()
    // Agregar aquí la ruta a users
    routers.use('/users', routesUsers)
    return routers
}

const auth_router = () => {
    const routers = Router()
    routers.use('/authentication', routesAuth)
    return routers
}

module.exports = {
    router: router(), // Llamar a la función y exportar el resultado
    auth_router: auth_router() // Llamar a la función y exportar el resultado
};










// const {Router} = require('express')

// const routesUsers = require('./../Users/routes/routesUsers.js')
// const routesAuth = require('./../Auth/routes/routesAuth.js')

// const router = Router()

// router.use('/users', routesUsers)


// router.use('/authentication', routesAuth)




// module.exports = {router}
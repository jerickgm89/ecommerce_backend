const { Router } = require('express')
const marked = require('marked');
const fs = require('fs-extra');
const path = require('path');

//                          ----> Users <-----<
const routesUsers = require('./../Users/routes/routesUsers.js')

//                          ----> Products <-----<
const routesProducts = require('./../Products/routes/index.js')

//                           ----> filtres and order <----
const routesFiltersProducts = require('../Products/routes/filtersAndOrder/routesFiltersProducts.js')


const router = () => {
    const routers = Router()
    routers.use('/products', routesProducts)
    routers.use('/filterproducts', routesFiltersProducts)
    routers.get('/', async (req, res) => {
        try {
            // Lee el contenido del archivo README.md
            const readmePath = path.join(__dirname, '../../README.md');
            fs.readFile(readmePath, 'utf8', (err, readmeContent) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error al cargar el archivo README.md');
                }
        
                // Convierte el contenido Markdown a HTML usando 'marked.parse'
                const htmlContent = marked.parse(readmeContent);
        
                // Envía el contenido HTML como respuesta
                res.send(htmlContent);

            })
        } catch (err) {
            // Manejo de errores
            console.error(err);
            res.status(500).send('Error al cargar el archivo README.md');
        }
    
    });
    return routers
}

const auth_router = () => {
    const routers = Router()
    routers.use('/users', routesUsers)
    return routers
}

module.exports = {
    router: router(), // Llamar a la función y exportar el resultado
    auth_router: auth_router() // Llamar a la función y exportar el resultado
};
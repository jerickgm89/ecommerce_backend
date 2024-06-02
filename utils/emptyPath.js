const express = require('express');
const marked = require('marked');
const fs = require('fs-extra');
const path = require('path');



const emptyPath = express.Router();

emptyPath.get('/', async (req, res) => {
    try {
        // Lee el contenido del archivo README.md
        const readmePath = path.join(__dirname, '../README.md');
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


module.exports = emptyPath;

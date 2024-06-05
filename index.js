const server = require('./src/server');
const {conn} = require('./src/db.js');
const PORT = process.env.PORT || 3001;
const { initializeData } = require('./src/config/databaseInit.js')

conn.sync({ alter: true }).then(async () => {
    try {
        await initializeData(); // aqui se llama a la funcion initializeData que AUTOMATICAMENTE CARGUE PRODUCTOS AL LEVANTAR EL SERVER 
        console.log('Initial data loaded successfully');

        server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
        });

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
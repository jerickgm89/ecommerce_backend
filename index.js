
const server = require('./src/server');
const {conn} = require('./src/db.js')
const { initializeData } = require('./src/config/databaseInit');
const PORT = process.env.PORT || 3001;

(async () => {
  try {
    await conn.authenticate();
    console.log('Database connected');
    
    await conn.sync({ force: true });
    console.log('Models synchronized successfully!');

    await initializeData(); // aqui se llama a la funcion initializeData que AUTOMATICAMENTE CARGUE PRODUCTOS AL LEVANTAR EL SERVER 
    console.log('Initial data loaded successfully');

    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
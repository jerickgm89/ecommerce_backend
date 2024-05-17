
const server = require('./src/server');

const PORT = 3001;

conn.sync({ false: true }).then(async () => {
  try {
    await initializeData(); // aqui se llama a la funcion initializeData que AUTOMATICAMENTE CARGUE PRODUCTOS AL LEVANTAR EL SERVER 
    console.log('Initial data loaded successfully');

    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    });
} catch (error) {
    console.log(error)
}
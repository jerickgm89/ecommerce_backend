
const server = require('./src/server');
const {conn} = require('./src/db.js')
const PORT = process.env.PORT || 3001;

(async () => {
  try {
    await conn.authenticate();
    console.log('Database connected');
    
    await conn.sync({ force: false });
    console.log('Models synchronized successfully!');

    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

const server = require('./src/server');
const {conn} = require('./src/db.js')
const PORT = 3001;

try {
    server.listen(PORT, async () => {
      console.log(`Server listening on port ${PORT}`);
      await conn.sync({ force: true });
      console.log('Database connected');
  
  
  
    });
  } catch ( error ) {
    console.log(error);
  
  }
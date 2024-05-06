
const server = require('./src/server');

const PORT = 3001;

try {
    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    });
} catch (error) {
    console.log(error)
}
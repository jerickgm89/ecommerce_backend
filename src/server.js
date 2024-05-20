require("dotenv").config();
const express = require('express');
const { 
    router,
    auth_router
} = require('./router/index.js');
const cors = require( 'cors' );
const morgan = require( 'morgan');


const server = express();

//esta expresión permite  al servidor Express entender y procesar datos enviados en formato JSON en las solicitudes entrantes
server.get('/favicon.ico', (req, res) => res.status(204).end());

// Configuración para excluir `favicon.ico` en los logs
server.use(
  morgan('dev', {
    skip: function (req) {
      return req.url === '/favicon.ico';
    }
  })
);

server.use(express.json());
server.use(morgan('dev'));
server.use(cors());
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use(router);
server.use(auth_router);

module.exports = server;
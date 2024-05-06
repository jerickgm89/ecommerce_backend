
const express = require('express');
const router = require('./router/index.js');
const cors = require('cors');
const morgan = require('morgan');

const server = express();

//esta expresión permite  al servidor Express entender y procesar datos enviados en formato JSON en las solicitudes entrantes
server.use(express.json());

server.use(morgan('dev'));
server.use(cors());
;

server.use(router);


module.exports = server;
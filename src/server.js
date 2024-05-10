require("dotenv").config();
const express = require('express');
const { auth } = require('express-openid-connect');
const { 
    router,
    auth_router
} = require('./router/index.js');
const cors = require('cors');
const morgan = require('morgan');
const { SECRET, BASEURL, CLIENTID, ISSUER } = process.env;

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: SECRET,
    baseURL: BASEURL,
    clientID: CLIENTID,
    issuerBaseURL: ISSUER
};

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

server.use(auth(config));

server.use(router);
server.use(auth_router);

module.exports = server;
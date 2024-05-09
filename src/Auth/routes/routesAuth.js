const routesAuth = require("express").Router()
const { requiresAuth } = require('express-openid-connect');


routesAuth.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
routesAuth.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});
    
module.exports = routesAuth;
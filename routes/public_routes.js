const express = require('express');
const AuthenticationController = require('../controllers/login.controller');
let routes = express.Router();


routes.post('/login', AuthenticationController.login);
routes.post('/register', AuthenticationController.register);

// Export the routes
module.exports = routes;

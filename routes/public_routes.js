const express = require('express');
const AuthenticationController = require('../controllers/login.controller');
let routes = express.Router();


routes.post('/login', AuthController.login);
routes.post('/register', AuthController.register);

// Export the routes
module.exports = routes;

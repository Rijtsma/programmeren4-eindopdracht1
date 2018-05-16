const express = require('express');
const AuthenticationController = require('../controllers/login.controller');
let routes = express.Router();

routes.get('/', function (req, res) {
    res.status(200);
    res.json({
        "description": "Insecure area, use /api/login or /api/register"
    });
});


routes.post('/login', AuthenticationController.login);
routes.post('/register', AuthenticationController.register);

// Export the routes
module.exports = routes;

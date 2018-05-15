const auth = require('../logon/tokenLogin');
const assert = require('assert');
const db = require('../config/connectDB');

module.exports = {
    validateToken(request, response, next) {
        console.log('Validation of token requested');
        const token = request.header('x-access-token') || '';
            auth.decodeToken(token, (error, payload) => {
                if(error) {
                    console.log('Error: ' + error.message);
                    const err = {
                        "status": 401,
                        "description": error.message
                    };
                    next(err);
                } else {
                    console.log('Authenticated! Payload = ');
                    console.dir(payload);
                    request.user = payload.sub;
                    next();
                }
            });
        },

    login(request, response, next) {
        try {
            console.log('Login attempt');
            const email = request.body.user || '';
            const password = request.body.password || '';

            assert(email !== '', 'Username was not defined or passed as empty');
            assert(password !== '', 'Password was not defined or passed as empty');
            assert(typeof(email) === 'string', 'Username is not of type string');
            assert(typeof(password) === 'string', 'Password is not of type string');

            db.query('SELECT * FROM account WHERE Email=? AND Password=?;', [email, password], (error, rows, fields) => {
               if(error) {
                   response.status(500).json({
                       status: 500,
                       description: error.message || error
                   }).end();
               } else {
                   if(rows.length > 0) {
                       const token = auth.encodeToken(username);
                       response.status(200).json({
                           token: token
                       }).end();
                   } else {
                       response.status(404).json({
                           status: 404,
                           description: "Invalid username/password"
                       }).end();
                   }
               }
            });
        } catch (err) {
            next({
                status: 500,
                description: err.toString()
            });
        }
    },

    register(request, response, next) {
        try {
            console.log('Registration attempt');
            const firstname =  request.body.firstname || '';
            const lastname =  request.body.lastname || '';
            const email = request.body.user || '';
            const password = request.body.password || '';

            assert(email !== '', 'Username was not defined or passed as empty');
            assert(password !== '', 'Password was not defined or passed as empty');
            assert(typeof(email) === 'string', 'Username is not of type string');
            assert(typeof(password) === 'string', 'Password is not of type string');

            db.query('SELECT * FROM user WHERE Email=? AND Password=?;', [email, password], (error, rows, fields) => {
                if(error) {
                    response.status(500).json({
                        status: 500,
                        description: error.message || error
                    }).end();
                } else {
                    if(rows.length > 0) {
                        response.status(404).json({
                            status: 500,
                            description: "An account with that username already exists"
                        }).end();
                    } else {
                        db.query('INSERT INTO user (voornaam, achternaam, email, password) VALUES (?,?,?,?);', [firstname, lastname, username, password], (error, rows, fields) => {
                            response.status(200).json({
                                status: 200,
                                description: 'Account successfully created'
                            });
                        });
                    }
                }
            });
        } catch (err) {
            next({
                status: 500,
                description: err.toString()
            });
        }
    }
};
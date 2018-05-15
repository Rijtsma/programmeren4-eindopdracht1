const config = require('../config/tokenConfig');
const moment = require('moment');
const jwt = require('jwt-simple');

//VERSLEUTELEN
function encodeToken(username) {
    const payload = {
        exp: moment().add(10, 'minutes').unix(), //hoe lang mag de token gebruikt worden
        iat: moment().unix(),
        sub: username
    };

    return jwt.encode(payload, config.secretKey);
}

//ONTSLEUTELEN
function decodeToken(token, callback) {
    try {
        const payload = jwt.decode(token, config.secretKey);
        const now = moment().unix(); //is de token te oud?
        if(now > payload.exp) {
            callback('Token has expired', null);
        } else {
            callback(null, payload);
        }
    } catch(error) {
        callback(error, null);
    }
}

module.exports = { encodeToken, decodeToken };
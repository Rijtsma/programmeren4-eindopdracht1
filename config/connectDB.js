let mysql = require('mysql');
let config = require('./db.json');

const connectionSettings = {
    host: process.env.DB_HOST || config.database_host,
    user: process.env.DB_USER || config.database_user,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE || config.database_name,
    port: 3306,
    debug: false
}
const reconnectTimeout = 2000; // ms.

var connection;


function handleDisconnect() {
    connection = mysql.createConnection(connectionSettings);

    connection.connect(function (error) {
        if (error) {
            console.error('Error connecting to database ' + connectionSettings.database + ' on ' + connectionSettings.host + ': ' + error.message);
            connection.end();
            setTimeout(handleDisconnect, reconnectTimeout);
        } else {
            console.log('Connected to database ' + connectionSettings.database + ' on ' + connectionSettings.host + ', state = ' + connection.state);
        }
    });
    connection.on('error', function (error) {
        if (error.code === 'ECONNRESET') {
            console.error('Connection state = ' + connection.state + ' - reconnecting');
            connection.end();
            handleDisconnect();
        } else {
            console.error('Connection ERROR - database ' + connectionSettings.database + ' on ' + connectionSettings.host + ': ' + error.message);
            connection.end();
            handleDisconnect();
        }
    });
}

handleDisconnect();

module.exports = connection;
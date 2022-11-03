const mysql = require('mysql2');
const dbConfig = require('../configs/db.config.js');

const connection = mysql.createConnection( {
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
});

module.exports = connection;
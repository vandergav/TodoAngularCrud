var mysql = require('mysql');
require('dotenv').config({ path: './config/config.env' });

var db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

// ***DOCKER***
// console.log(process.env.MYSQL_HOST)
// console.log(process.env.MYSQL_USER)
// console.log(process.env.MYSQL_PASSWORD)
// console.log(process.env.MYSQL_DATABASE)
// var db = mysql.createConnection({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE
// });

module.exports = db;
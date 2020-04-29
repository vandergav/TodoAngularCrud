const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken')
// const { jwt } = require('./controllers/authentication')
// const knex = require('knex')

dotenv.config({ path: './config/config.env' });

const transactions = require('./routes/transactions')
const authentication = require('./routes/authentication')

// const db = knex({
//     client: 'mysql',
//     connection: {
//         host: '127.0.0.1',
//         user: 'gavin',
//         password: 'gavin',
//         database: 'todoangular'
//     }
// });

const app = express();

// app.get('/', (req, res) => res.send('Hello'));

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, UPDATE, DELETE, OPTIONS');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use(cors())
app.use(express.json())

app.use('/api/v1/sign-in', authentication)
app.use('/api/v1/transactions', verifyToken, transactions);

// function verifyToken(req, res, next) {
//     const bearerHeader = req.headers['authorization'];
//     if (typeof bearerHeader !== 'undefined') {
//         const bearer = bearerHeader.split(' ')
//         const bearerToken = bearer[1]
//         req.token = bearerToken
//         next()
//     } else {
//         res.sendStatus(403);
//     }
// }

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    console.log("Hi")
    console.log(bearerHeader)
    const token = bearerHeader && bearerHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    console.log(jwt.decode(token))
    jwt.verify(token, process.env.SECRET, (err, data) => {
        if (err) return res.send(err)
        req.data = data
        next()
    })
}

const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
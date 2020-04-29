require('dotenv').config({ path: '../config/config.env' });
Q = require('q')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const redis = require('redis')
var db = require('../dbconnection.js')

// setup Redis:
const redisClient = redis.createClient({ host: process.env.host })

// DOCKER
// const redisClient =redis.createClient({host: process.env.REDIS_URI})

const handleSignin = (req, res) => {
    var deferred = Q.defer() //Q.js for nested promises
    const { username, password } = req.body
    bcrypt.hash(username, null, null, (err, hash) => {
        console.log(hash)
    })
    if (!username || !password) {
        // return res.status(400).json('incorrect form submission')
        Promise.reject('incorrect form submission')
    }
    let sql = `SELECT username, hash FROM login WHERE username = '${username}'`
    db.query(sql, (err, data) => {
        if (err) { Promise.reject('wrong credentials') }
        if (data[0] !== undefined) {
            const isValid = bcrypt.compareSync(password, data[0].hash)
            if (isValid) {
                let sql2 = `SELECT * FROM users WHERE username = '${username}'`
                db.query(sql2, (err, user) => {
                    if (err) { Promise.reject('unable to get user') }
                    deferred.resolve(user[0]) //because mysql returns array
                })
            }
            else { Promise.reject('wrong credentials') }
        } else { Promise.reject('wrong credentials') }
    })
    return deferred.promise
}

const getAuthTokenId = (req, res) => {
    const { authorization } = req.headers
    return redisClient.get(authorization, (err, reply) => {
        if (err || !reply) {
            return res.status(400).json('Unauthorized')
        }
        return res.json({ id: reply })
    })
}

const signToken = (email) => {
    const jwtPayload = { email }
    return jwt.sign(jwtPayload, process.env.SECRET, { expiresIn: '2 days' })
}

//REDIS
const setToken = (key, value) => {
    return (redisClient.set(key, value))
}

createSessions = (user) => {
    const { email, username } = user
    const token = signToken(email)
    console.log(token)
    setToken(username, token) //store into Redis
    var mess = { success: 'true', token, username }
    return mess
}

//@desc     Sign-in transaction
//@route    PUT /api/v1/transactions/sign-in
//@access   Protected
exports.signinTransaction = async (req, res, next) => {
    const { authorization } = req.headers
    return authorization ? getAuthTokenId(req, res) :
        handleSignin(req, res)
            .then(user => {
                return user.username && user.email ? createSessions(user) : Promise.reject(user)
            }).then(session => { console.log(session); res.json(session) })
            .catch(err => res.status(400).json(err))
    // const username = req.body.username
    // const password = req.body.password
    // if (username === 'demo' && password === 'demo') {
    //     res.json({
    //         name: 'SitePoint Reader',
    //         token: jwtToken
    //     });
    // }
    // res.send(422, 'Invalid username and password');
}

// exports.jwt = jwt
// exports.redisClient = redisClient
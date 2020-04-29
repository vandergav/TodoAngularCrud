const express = require('express');
const router = express.Router();
const { signinTransaction } = require('../controllers/authentication')

//***JWT Authentication***

router
    .route('/')
    .post(signinTransaction)

module.exports = router;
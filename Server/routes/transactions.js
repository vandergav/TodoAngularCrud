const express = require('express');
const router = express.Router();
const { getTransactions, getTransaction, addTransaction, updateTransaction, deleteTransaction } = require('../controllers/transactions')

// router.get('/', (req, res) => res.send('Hello'));

router
    .route('/')
    .get(getTransactions)
    .post(addTransaction)

router
    .route('/:id')
    .get(getTransaction)
    // .post(updateTransaction)
    .put(updateTransaction)
    .delete(deleteTransaction)

module.exports = router;
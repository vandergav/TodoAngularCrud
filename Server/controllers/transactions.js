// const { redisClient } = require('./authentication')

var db = require('../dbconnection.js');
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected...')
})

//@desc     Get transaction
//@route    GET /api/v1/transactions
//@access   Public
exports.getTransaction = async (req, res, next) => {
    // res.send('GET transaction');
    const { id, title, complete } = req.body
    let sql = `SELECT * FROM todos WHERE id = '${id}'`;
    await db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).json(result);
    });
}

//@desc     Get transactions
//@route    GET /api/v1/transactions
//@access   Public
exports.getTransactions = async (req, res, next) => {
    // res.send('GET transactions');
    let sql = 'SELECT * FROM todos'
    await db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(200).json(result);
    });
}

//@desc     Update transaction
//@route    GET /api/v1/transactions
//@access   Public
exports.updateTransaction = async (req, res, next) => {
    // res.send('UPDATE transaction');
    const { id, title, complete } = req.body
    console.log(complete)
    let sql = `UPDATE todos SET complete = ${complete} WHERE id = '${id}'`
    await db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('post updated... ')
    });
}

//@desc     Add transaction
//@route    GET /api/v1/transactions
//@access   Public
exports.addTransaction = async (req, res, next) => {
    // res.send('POST transaction');
    const { id, title, complete } = req.body
    let todo = { id: id, title: title, complete: complete }
    let sql = 'INSERT INTO todos SET ?'
    await db.query(sql, todo, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('post added... ')
    });
}

//@desc     Delete transaction
//@route    DELETE /api/v1/transactions/:id
//@access   Public
exports.deleteTransaction = async (req, res, next) => {
    // res.send('DELETE Transaction');
    console.log(req.params)
    let sql = `DELETE FROM todos WHERE id = '${req.params.id}'`
    await db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('post deleted... ')
    });
}
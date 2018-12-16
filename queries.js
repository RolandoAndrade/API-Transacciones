const promise = require('bluebird');

const options = {
    // Initialization Options
    promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://postgres:1@localhost:5432/transacciones';
const db = pgp(connectionString);

function getAllUsers(req, res, next)
{
    if(req.query.toString().length>0)
    {
         return searchUser(req,res,next);
    }
    db.any('select * from users')
        .then(function (data)
        {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                });
        })
        .catch(function (err)
        {
            return next(err);
        });
}

function getUserByID(req, res, next)
{
    const userID = parseInt(req.params.id);
    db.one('select * from users where id = $1', userID)
        .then(function (data)
        {
            res.status(200)
                .json({
                    status: 'success',
                    data: data
                });
        })
        .catch(function (err)
        {
            if(err.message==="No data returned from the query.")
                return next("No hay usuario con este ID");
            return next(err);
        });
}

function createUser(req, res, next)
{
    if (req.body.second_name===undefined)
    {
        req.body.second_name="";
    }
    db.none('insert into users (first_name, second_name, first_surname, second_surname,email) '+
    "VALUES (${first_name}, ${second_name}, ${first_surname}, ${second_surname}, ${email})",
        req.body)
        .then(function ()
        {
            db.one('SELECT * FROM users ORDER BY ID DESC LIMIT 1')
                .then(function (data)
                {
                    res.status(200)
                        .json({
                            status: 'success',
                            data: data
                        });
                })
                .catch(function (err)
                {
                    return next(err);
                });
        })
        .catch(function (err)
        {
            return next(err.message);
        });
}

function updateUser(req, res, next)
{
    const userID = parseInt(req.params.id);
    db.one('select * from users where id = $1', userID)
        .then(function (data)
        {
            req.body.first_name=req.body.first_name||data.first_name;
            req.body.second_name=req.body.second_name||data.second_name;
            req.body.first_surname=req.body.first_surname||data.first_surname;
            req.body.second_surname=req.body.second_surname||data.second_surname;
            req.body.email=req.body.email||data.email;
            db.none('update users set first_name=$1, second_name=$2, first_surname=$3, second_surname=$4, email=$5' +
                ' where id=$6',
                [req.body.first_name, req.body.second_name, req.body.first_surname, req.body.second_surname,
                    req.body.email, parseInt(req.params.id)])
                .then(function ()
                {
                    res.status(200)
                        .json({
                            status: 'success',
                            message: req.body
                        });
                })
                .catch(function (err)
                {
                    return next(err);
                });
        })
        .catch(function (err)
        {
            if(err.message==="No data returned from the query.")
                return next("No hay usuario con este ID");
            return next(err);
        });

}

function removeUser(req, res, next)
{
    const userID = parseInt(req.params.id);
    db.result('delete from users where id = $1', userID)
        .then(function (result)
        {
            res.status(200)
                .json({
                    status: 'success',
                    message: `Removed ${result.rowCount} user`
                });
        })
        .catch(function (err)
        {
            return next(err);
        });
}

function searchUser(req, res, next)
{
    const first_name = req.query.first_name;
    const second_name = req.query.second_name;
    const first_surname = req.query.first_surname;
    const second_surname = req.query.second_surname;
    const email = req.query.email;
    let qu='select * from users' +
        ' where LOWER(first_name) like LOWER('+"'%"+(first_name||"")+"%'"+')'+
        'and LOWER(second_name) like LOWER('+"'%"+(second_name||"")+"%'"+')'+
        'and LOWER(first_surname) like LOWER('+"'%"+(first_surname||"")+"%'"+')'+
        'and LOWER(second_surname) like LOWER('+"'%"+(second_surname||"")+"%'"+')'+
        'and LOWER(email) like LOWER('+"'%"+(email||"")+"%'"+')';
    db.any(qu)
        .then(function (data)
        {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                });
        })
        .catch(function (err)
        {
            return next(err);
        });
}


function getAllTransactions(req, res, next)
{
    if(req.query.toString().length>0)
    {
        return searchTransaction(req,res,next);
    }
    db.any('select * from transactions')
        .then(function (data)
        {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                });
        })
        .catch(function (err)
        {
            return next(err);
        });
}

function getTransactionByID(req, res, next)
{
    const userID = parseInt(req.params.id);
    db.one('select * from transactions where id = $1', userID)
        .then(function (data)
        {
            res.status(200)
                .json({
                    status: 'success',
                    data: data
                });
        })
        .catch(function (err)
        {
            if(err.message==="No data returned from the query.")
                return next("No hay transacción con este ID");
            return next(err);
        });
}


function createATransaction(req, res, next)
{
    if (req.body.date===undefined)
    {
        req.body.date=new Date();
    }
    db.none('insert into transactions (customer, date, amount) '+
        "VALUES (${customer}, ${date}, ${amount})",
        req.body)
        .then(function ()
        {
            db.one('SELECT * FROM transactions ORDER BY ID DESC LIMIT 1')
                .then(function (data)
                {
                    res.status(200)
                        .json({
                            status: 'success',
                            data: data
                        });
                })
                .catch(function (err)
                {
                    return next(err);
                });
        })
        .catch(function (err)
        {
            return next(err.message);
        });
}

function updateTransactions(req, res, next)
{
    const userID = parseInt(req.params.id);
    db.one('select * from transactions where id = $1', userID)
        .then(function (data)
        {
            req.body.customer=req.body.customer||data.customer;
            req.body.date=new Date(req.body.date)||data.date;
            req.body.amount=req.body.amount||data.amount;
            db.none('update transactions set customer=$1, date=$2, amount=$3' +
                ' where id=$4',
                [req.body.customer, req.body.date, req.body.amount, req.body.second_surname, parseInt(req.params.id)])
                .then(function ()
                {
                    res.status(200)
                        .json({
                            status: 'success',
                            message: req.body
                        });
                })
                .catch(function (err)
                {
                    return next(err);
                });
        })
        .catch(function (err)
        {
            if(err.message==="No data returned from the query.")
                return next("No hay transacciones con este ID");
            return next(err);
        });

}

function removeTransaction(req, res, next)
{
    const userID = parseInt(req.params.id);
    db.result('delete from transactions where id = $1', userID)
        .then(function (result)
        {
            res.status(200)
                .json({
                    status: 'success',
                    message: `Removed ${result.rowCount} transaction`
                });
        })
        .catch(function (err)
        {
            return next(err);
        });
}

function searchTransaction(req, res, next)
{
    const customer = req.query.customer;
    const date = req.query.date||"";
    const amount = req.query.amount||"";
    let qu;
    if(customer!==undefined)
    {
        qu='select * from transactions' +
            ' where customer='+customer+
            ' and TO_CHAR(date,\'dd.mm.yyyy\') LIKE '+"'%"+date+"%'"+
            ' and CAST(amount AS VARCHAR(20)) like '+"'%"+amount+"%'";
    }
    else
    {
        qu='select * from transactions' +
            ' where'+
            ' TO_CHAR(date,\'dd.mm.yyyy\') LIKE '+"'%"+date+"%'"+
            ' and CAST(amount AS VARCHAR(20)) like '+"'%"+amount+"%'";
    }
    db.any(qu)
        .then(function (data)
        {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                });
        })
        .catch(function (err)
        {
            return next(err);
        });
}


module.exports = {
    getAllUsers: getAllUsers,
    getUserByID: getUserByID,
    createUser: createUser,
    updateUser: updateUser,
    removeUser: removeUser,
    getAllTransactions: getAllTransactions,
    getTransactionByID:getTransactionByID,
    createATransaction: createATransaction,
    updateTransactions: updateTransactions,
    removeTransaction: removeTransaction,
};
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
    return searchUser(req,res,next);
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
                return next("There is not costumer with this ID");
            return next(err);
        });
}

function isEmailAlreadyExist(email)
{
    return db.one('select * from users where email = $1', email).then(function (data)
    {
        return data.length>0;
    }).catch(function (err)
    {
        return false;
    });
}


function createUser(req, res, next)
{
    if (req.body.second_name===undefined)
    {
        req.body.second_name="";
    }
    if(!validateEmail(req.body.email))
    {
        return next("Email format incorrect");
    }
    if(isEmailAlreadyExist(req.body.email))
    {
        return next("Email already registered");
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
    if(req.body.email!==undefined&&!validateEmail(req.body.email))
    {
        return next("Email format incorrect");
    }
    if(req.body.email!==undefined&&!isEmailAlreadyExist(req.body.email))
    {
        return next("Email already registered");
    }
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
                return next("There is not user with this ID");
            return next(err);
        });

}

function removeUser(req, res, next)
{
    const userID = parseInt(req.params.id);
    db.result('delete from users where id = $1', userID)
        .then(function (result)
        {
            removeAllTransactionsOfUser(req,res,next,userID);
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

function removeAllTransactionsOfUser(req, res, next, id)
{
    db.result('delete from transactions where customer = $1', id)
        .then(function (result)
        {

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

function getCustomerString(req, res, next, id)
{
    return db.one('select * from users where id = $1', id)
        .then(function (data)
        {
            return data;
        })
        .catch(function (err)
        {
            return next(err);
        });
}


function getAllTransactions(req, res, next)
{
    return searchTransaction(req,res,next);
}

function getTransactionByID(req, res, next)
{
    const userID = parseInt(req.params.id);
    db.one('select * from transactions where id = $1', userID)
        .then(async function (data)
        {
            data.customer=await getCustomerString(req,res,next,data.customer);
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
    if (req.body.date === undefined)
    {
        req.body.date = new Date();
    }
    if(req.body.customer===undefined)
    {
        return next("A customer ID is required");
    }
    db.one('select * from users where id = $1', parseInt(req.body.customer))
        .then(function (dat)
        {
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
        })
        .catch(function (err)
        {
            if(err.message==="No data returned from the query.")
                return next("There is not costumer with the given ID");
            return next(err);
        });
}

function updateTransactions(req, res, next)
{
    const userID = parseInt(req.params.id);
    db.one('select * from transactions where id = $1', userID)
        .then(function (data)
        {
            req.body.customer=req.body.customer||data.customer;
            req.body.date=req.body.date!==undefined?new Date(req.body.date):data.date;
            req.body.amount=req.body.amount||data.amount;
            console.log(req.body);
            db.none('update transactions set customer=$1, date=$2, amount=$3' +
                ' where id=$4',
                [req.body.customer, req.body.date, req.body.amount, parseInt(req.params.id)])
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
                return next("There is not transactions with this ID");
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
        .then(async function (data)
        {
            for(let i=0;i<data.length;i++)
            {
                data[i].customer=await getCustomerString(req,res,next,data[i].customer);
            }
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

function validateEmail(email) {
    const REGEXP = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    email = email.trim();
    if(REGEXP.test(email)) {
        return true;
    }

    console.error('Invalid email. ');
    return false;
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
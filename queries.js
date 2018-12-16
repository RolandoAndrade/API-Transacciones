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

function removePuppy(req, res, next) {
    var pupID = parseInt(req.params.id);
    db.result('delete from users where id = $1', pupID)
        .then(function (result) {
            /* jshint ignore:start */
            res.status(200)
                .json({
                    status: 'success',
                    message: `Removed ${result.rowCount} puppy`
                });
            /* jshint ignore:end */
        })
        .catch(function (err) {
            return next(err);
        });
}


module.exports = {
    getAllPuppies: getAllUsers,
    getUserByID: getUserByID,
    createUser: createUser,
    updateUser: updateUser,
    /*removePuppy: removePuppy*/
};
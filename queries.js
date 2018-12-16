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
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getUserByID(req, res, next)
{
    const pupID = parseInt(req.params.id);
    db.one('select * from users where id = $1', pupID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data
                });
        })
        .catch(function (err) {
            if(err.message==="No data returned from the query.")
                return next("El ID que desea borrar es inválido");
            return next(err);
        });
}

function createUser(req, res, next) {
    console.log(req.body);
    db.none('insert into users (first_name, second_name, first_surname, second_surname,email) '+
    'VALUES (${first_name}, ${second_name}, ${first_surname}, $(second_surname),${email)',
        req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one puppy'
                });
        })
        .catch(function (err) {
            console.log(err);
            return next(err);
        });
}

function updatePuppy(req, res, next) {
    db.none('update users set name=$1, breed=$2, age=$3, sex=$4 where id=$5',
        [req.body.name, req.body.breed, parseInt(req.body.age),
            req.body.sex, parseInt(req.params.id)])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated puppy'
                });
        })
        .catch(function (err) {
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
    /*updatePuppy: updatePuppy,
    removePuppy: removePuppy*/
};
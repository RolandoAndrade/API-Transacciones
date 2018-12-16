var express = require('express');
var router = express.Router();
var db = require('../queries');

router.get('/api/users', db.getAllUsers);

router.get('/api/users/:id(\\d+)', db.getUserByID);

router.post('/api/users', db.createUser);

router.put('/api/users/:id(\\d+)', db.updateUser);

router.delete('/api/users/:id', db.removeUser);

// application -------------------------------------------------------------
router.get('/', function (req, res) {

  res.render('index', {title: 'node-postgres-promises'}); // load the single view file (angular will handle the page changes on the front-end)
});

module.exports = router;
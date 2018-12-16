var express = require('express');
var router = express.Router();
var db = require('../queries');

router.get('/api/customers', db.getAllUsers);

router.get('/api/customers/:id(\\d+)', db.getUserByID);

router.post('/api/customers', db.createUser);

router.put('/api/customers/:id(\\d+)', db.updateUser);

router.delete('/api/customers/:id', db.removeUser);

// application -------------------------------------------------------------
router.get('/', function (req, res) {

  res.render('index', {title: 'node-postgres-promises'}); // load the single view file (angular will handle the page changes on the front-end)
});

module.exports = router;
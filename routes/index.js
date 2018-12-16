var express = require('express');
var router = express.Router();
var db = require('../queries');

router.get('/api/users', db.getAllPuppies);

router.get('/api/users/:id(\\d+)', db.getUserByID);

router.post('/api/users', db.createUser);
/*router.put('/api/puppies/:id', db.updatePuppy);
router.delete('/api/puppies/:id', db.removePuppy);*/

// application -------------------------------------------------------------
router.get('/', function (req, res) {

  res.render('index', {title: 'node-postgres-promises'}); // load the single view file (angular will handle the page changes on the front-end)
});

module.exports = router;
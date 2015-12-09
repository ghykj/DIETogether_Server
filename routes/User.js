var express = require('express');
var User = require('../app/Controller/User');
var router = express.Router();

router.get('/', function(req, res) {
  res.send({
    method: req.method,
    data : 'User'
  });
});

//localhost:3333/user

router.get('/id/:id', User.getUserById);
router.get('/name/:name', User.getUserByName);
router.post('/', User.addUser);

module.exports = router;

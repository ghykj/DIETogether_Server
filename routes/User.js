var express = require('express');
var User = require('../app/Controller/User');
var router = express.Router();

router.get('/', function(req, res) {
  res.send({
    method: req.method,
    data : 'User'
  });
});

router.get('/:id', User.getUserById);
router.post('/', User.addUser);

module.exports = router;

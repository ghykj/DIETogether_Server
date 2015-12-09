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

//id를 기반으로 user의 모든 정보 조회
router.get('/id/:id', User.getUserById);

//id를 기반으로 친구를 찾는다.
router.get('/find/:id', User.getUserById);

//user를 추가
router.post('/', User.addUser);

//친구 추가
router.use('/addfriend', User.getMyFriendsInfo);
router.post('/addfriend', User.addfriend);

module.exports = router;

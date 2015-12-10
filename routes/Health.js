var express = require('express');
var Health = require('../app/Controller/Health');
var router = express.Router();

router.get('/', function(req, res) {
  res.send({
    method: req.method,
    data : 'Health'
  });
});

//localhost:3333/health

//운동 추가
router.post('/', Health.addHealth);

//운동 삭제
router.delete('/', Health.deleteHealth);

//만약 내가 친구의 친구로 등록 되어있을때만...조회 가능...
//친구들의 정보...
router.use('/friends/id/:id', Health.checkFriends);
router.get('/friends/id/:id', Health.getHealth);

module.exports = router;

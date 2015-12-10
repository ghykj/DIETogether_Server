var express = require('express');
var Walking = require('../app/Controller/Walking');
var router = express.Router();

router.get('/', function(req, res) {
  res.send({
    method: req.method,
    data : 'Walking'
  });
});

//localhost:3333/walking

//워킹 생성, 매일 23시59분59초에 불려져야함.
router.post('/', Walking.createWalking);

//localhost:3333/waking/update
//워킹 update, 수시로 업데이트 됨.
router.post('/update', Walking.updateWalking);

//만약 내가 친구의 친구로 등록 되어있을때만...조회 가능...
//친구들의 정보...
router.use('/friends/id/:id', Walking.checkFriends);
router.get('/friends/id/:id', Walking.getWalking);

module.exports = router;

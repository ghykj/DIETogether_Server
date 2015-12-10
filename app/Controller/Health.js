var Health = require('../Model/Health');
var User = require('../Model/User');
var moment = require('moment');
var _ = require('underscore');
var async = require('async');

module.exports.checkFriends = function(req, res, next){
  //check if request user is valid to send other person info
  var id = req.params.id;
  var UserDAO = new User();
  UserDAO.getMyFriendsInfo(id, function(err, result){
    var friends = JSON.parse(result[0].friends);
    if(friends.friend_list.length < 1){
      res.json({
        code: 400,
        data: "아직 친구가 없어요ㅠㅠ"
      });
    }
    else{
      req.friends = friends;
      next();
    }
  });
};

module.exports.getHealth = function(req, res){
  var response = {};
  var id = req.params.id; //요청자의 id
  var request_friend_list = req.friends.friend_list; //요청자의 친구 리스트
  var UserDAO = new User();
  var HealthDAO = new Health();
  var friend_list_of_friends = [];
  var can_provide_info_friends = [];

  async.eachSeries(request_friend_list, function(friend, callback){
    UserDAO.getMyFriendsInfo(friend.id, function(err, result){
      friend_list_of_friends.push({
        id: result[0].id,
        friends: JSON.parse(result[0].friends).friend_list
      });
      callback(); //i++과 같은 역활
    }); //친구의 친구 리스트를 얻어옴
  }, function(err){
    async.eachSeries(friend_list_of_friends, function(json_data,callback){
      console.log(json_data);
      async.eachSeries(json_data.friends, function(data, callback){
        if(data.id === id){
          can_provide_info_friends.push(json_data.id);
        }
        callback();
      });
      callback();
    }, function(err){
      console.log(can_provide_info_friends);
      var final_result = [];
      async.eachSeries(can_provide_info_friends, function(friend,callback){
        HealthDAO.getHealth(friend, function(err, results){
          async.eachSeries(results, function(result, callback){
            final_result.push(result);
            callback();
          },function(err){
            callback();
          });
        });
      }, function(err){
        res.json({
          code : 200,
          data : final_result
        });
      });
    });
  });
}

module.exports.addHealth = function(req, res){
  var response = {};
  var params = {
    health_name: req.body.health_name,
    health_count: req.body.health_count,
    id: req.body.id,
    date: moment().format('YYYY-MM-DD')
  };
  //date: req.body.date
  var healthDAO = new Health();
  healthDAO.addHealth(params, function(err, result){
    if(err){
      response.code = 400;
      response.data = "addHealth FAIL";
    }
    else{
      response.code = 200;
      response.data = "addHealth OK";
    }
    res.json(response);
  });
};

module.exports.deleteHealth = function(req, res){
  var response = {};
  var params = {
    health_name: req.body.health_name,
    health_count: req.body.health_count,
    id: req.body.id,
    date: moment().format('YYYY-MM-DD')
  };
  //date: req.body.date
  var healthDAO = new Health();
  healthDAO.deleteHealth(params, function(err, result){
    if(err){
      response.code = 400;
      response.data = "deleteHealth FAIL";
    }
    else{
      response.code = 200;
      response.data = "deleteHealth OK";
    }
    res.json(response);
  });
};

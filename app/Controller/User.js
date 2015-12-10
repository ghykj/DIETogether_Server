var User = require('../Model/User');

module.exports.getMyFriendsInfo = function(req, res, next){
  var id = req.body.my_id;
  var getFriends = new User();
  getFriends.getMyFriendsInfo(id, function(err, result){
    /*
    result[0] :
      {
        id: 'admin',
        name: '김나정',
        friends: '{"friends_list": []}'
      }
    */
    var friend_info = JSON.parse(result[0].friends);
    req.friend_info = friend_info;
    next();
  });
}

module.exports.addfriend = function(req, res, next){
  var response = {};
  console.log("hi!!!!")
  console.log(req.friend_info);
  var parameter = {
    my_id: req.body.my_id,
    friend_id: req.body.friend_id,
    friend_name: req.body.friend_name,
    my_friends_list: req.friend_info.friend_list
  }
  console.log(parameter);

  var add_friend = new User();

  add_friend.addfriend(parameter, function(err, result){
    if(err){
      response.code = 400,
      response.data = "Addfriend Fail"
    }
    else{
      response.code =  200,
      response.data = "Addfriend OK"
    }
    res.json(response);
  });
}

//이름으로 친구 찾기
module.exports.getUserByName = function(req, res){
  console.log("request method : " + req.method);
  console.log("user.getUserByName() is called!");

  var response = {};
  var getUser = new User();
  var name = req.params.name;
  getUser.getUserByName(name, function(err, result){
    if(err){
      response.code = 400;
      response.data = "getUserByName Fail";
    }
    else{
      response.code = 200;
      response.user = result;
    }
    res.json(response);
  });
};


//id로 정보조회
module.exports.getUserById = function(req, res){
  console.log("request method : " + req.method);
  console.log("user.getUserById() is called!");

  var response = {};
  var getUser = new User();

  var id = req.params.id;

  getUser.getUserById(id, function(err, result){
    if(err){
      response.code = 400;
      response.data = "getUserById Fail";
    }
    else{
      response.code = 200;
      response.user = result;
    }
    res.json(response);
  });

};

module.exports.addUser = function(req, res){

  console.log("request method : " + req.method);
  console.log("user.addUser() is called!");

  var response = {};
  var newUser = new User();

	newUser.id = req.body.id;
  newUser.name = req.body.name;
	newUser.gender = req.body.gender;
  newUser.age = req.body.age;
  newUser.height = req.body.height;
  newUser.weight = req.body.weight;

	console.log(newUser);

  newUser.addUser(newUser, function(error, result){
    if(error){
      response.code = 400;
      response.data = "addUser Fail";
      if(error.errno === 1062){
        response.reason = "duplicate-id";
      }
    }
    else{
      response.code = 200;
      response.data = "addUser OK";
      response.user = newUser;
    }
    res.json(response);
  });
  delete newUser;
};

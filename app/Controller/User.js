var User = require('../Model/User');

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

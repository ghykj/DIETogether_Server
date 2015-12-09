var connection = require('../../lib/connection');
var async = require('async');

//Constructor
function User() {
  this.id = "";
  this.name = "";
  this.gender = "";
  this.age = 0;
  this.height = 0;
  this.weight = 0;
};

User.prototype.getMyFriendsInfo = function(my_id, callback){
  console.log("i will get my friends info");
  console.log("my_id : " + my_id);
  async.waterfall([
    function(callback){
      connection.getConnection(function(err, connection){
        callback(null, connection);
      });
    },
    function(connection, callback){
      connection.query("SELECT * FROM friendship WHERE id = ?", my_id, function(query_error, query_result){
        console.log("release connection!")
        connection.release();
        if(query_error){
          console.log("query error : " + query_error);
        }
        callback(JSON.parse(JSON.stringify(query_error)), query_result);
      });
    }
  ],
  function(async_waterfall_error, getMyFriendsInfo_result){
    callback(async_waterfall_error, getMyFriendsInfo_result);
  });
};

User.prototype.addfriend = function(parameter, callback){

  console.log("addfriend! parameter!")
  console.log(parameter);

  var new_friend = {
    id: parameter.friend_id,
    name: parameter.friend_name
  };
  parameter.my_friends_list.push(new_friend);
  var input_data = {
    friend_list: parameter.my_friends_list
  };

  async.waterfall([
    function(callback){
      connection.getConnection(function(err, connection){
        callback(null, connection);
      });
    },
    function(connection, callback){
      connection.query("UPDATE friendship set friends = ? WHERE id = ?",
        [JSON.stringify(input_data), parameter.my_id],
        function(query_error, query_result){
          console.log("release connection!")
          connection.release();
          if(query_error){
            console.log("query error : " + query_error);
          }
          callback(JSON.parse(JSON.stringify(query_error)), query_result);
        });
    }
  ],
  function(async_waterfall_error, addfriend_result){
    callback(async_waterfall_error, addfriend_result);
  });
};

User.prototype.getUserByName = function(name, callback){
  console.log("parameter : " + name);
  async.waterfall([
    function(callback){
      connection.getConnection(function(err, connection){
        callback(null, connection);
      });
    },
    function(connection, callback){
      connection.query("SELECT id FROM user WHERE name = ?", name, function(query_error, query_result){
        console.log("release connection!")
        connection.release();
        if(query_error){
          console.log("query error : " + query_error);
        }
        callback(JSON.parse(JSON.stringify(query_error)), query_result);
      });
    }
  ],
  function(async_waterfall_error, getUserByName_result){
    callback(async_waterfall_error, getUserByName_result);
  });
};

User.prototype.getUserById = function(id, callback){
  console.log("getUserById() in model.user.js");
  console.log("parameter : " + id);
  async.waterfall([
    function(callback){
      console.log("get database connection in Model.User.getUserById!")
      connection.getConnection(function(err, connection){
        callback(null, connection);
      });
    },
    function(connection, callback){
      connection.query("SELECT * FROM user WHERE id = ?", id, function(query_error, query_result){
        console.log("release connection!")
        connection.release();
        if(query_error){
          console.log("query error : " + query_error);
        }
        callback(JSON.parse(JSON.stringify(query_error)), query_result);
      });
    }
  ],
  function(async_waterfall_error, getUserById_result){
    callback(async_waterfall_error, getUserById_result);
  });
};

User.prototype.addUser = function(newUser, callback){
  console.log('addUser() in model.user.js');
  console.log("parameter : " + JSON.stringify(newUser));
  async.waterfall([
    function(callback){
      console.log("get database connection in Model.User.addUser!")
      connection.getConnection(function(err, connection){
        callback(null, connection);
      });
    },
    function(connection, callback){
      connection.query('INSERT INTO user SET ?', newUser, function(query_error, query_result){
        if(query_error){
          console.log("query error : " + query_error);
        }
        callback(JSON.parse(JSON.stringify(query_error)), connection);
      }); //connection.query();
    },
    function(connection, callback){
      var new_list = [];
      var init_friend = {
        friend_list: new_list
      }
      connection.query("INSERT INTO friendship VALUES(?, ?, ?)", [newUser.id, newUser.name, JSON.stringify(init_friend)], function(query_error, query_result){
          if(query_error){
            console.log("query error in insert friendship");
            console.log(query_error)
          }
          callback(JSON.parse(JSON.stringify(query_error)), query_result);
      });
    }
  ],
  function(async_waterfall_error, adduser_result){
    //async_waterfall_error : The error from callback
    callback(async_waterfall_error, adduser_result);
  });
};

module.exports = User;

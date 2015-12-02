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
        console.log("release connection!")
        connection.release();
        if(query_error){
          console.log("query error : " + query_error);
        }
        callback(JSON.parse(JSON.stringify(query_error)), query_result);
      }); //connection.query();
    }
  ],
  function(async_waterfall_error, adduser_result){
    //async_waterfall_error : The error from callback
    callback(async_waterfall_error, adduser_result);
  });
};

module.exports = User;

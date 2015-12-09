var connection = require('../lib/connection');
var async = require('async');

var list = [];

var friend = {
  friend_num: 0,
  friend_list: list
}

async.waterfall([
  function(callback){
    connection.getConnection(function(err, connection){
      callback(null, connection);
    });
  },
  function(connection, callback){
    connection.query("INSERT INTO test VALUES(?,?)", [2,JSON.stringify(friend)], function(query_error, query_result){
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
  console.log(getMyFriendsInfo_result)
});

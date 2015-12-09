var connection = require('../lib/connection');
var async = require('async');

async.waterfall([
  function(callback){
    connection.getConnection(function(err, connection){
      callback(null, connection);
    });
  },
  function(connection, callback){
    connection.query("select * from friendship",  function(query_error, query_result){
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
  //console.log(getMyFriendsInfo_result)
  var my_data = getMyFriendsInfo_result[0];
  var friends = my_data.friends;
  var json_friends = JSON.parse(friends);
  console.log(json_friends);
  console.log(json_friends.friend_num);
  console.log(json_friends.friend_list);
  json_friends.friend_list.push(1);
  console.log(json_friends.friend_list);

});

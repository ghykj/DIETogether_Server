var connection = require('../../lib/connection');
var async = require('async');

//Constructor
function Health() {
  this.health_name = "";
  this.health_count = 0;
  this.date = "";
  this.id = ""; //healther_id
};

Health.prototype.addHealth = function(params, callback){
  console.log("add health!");
  async.waterfall([
    function(callback){
      connection.getConnection(function(err, connection){
        callback(null, connection);
      });
    },
    function(connection, callback){
      connection.query("INSERT INTO health SET ?", params, function(query_error, query_result){
        console.log("release connection!")
        connection.release();
        if(query_error){
          console.log("query error : " + query_error);
        }
        callback(JSON.parse(JSON.stringify(query_error)), query_result);
      });
    }
  ],
  function(async_waterfall_error, addHealth_result){
    callback(async_waterfall_error, addHealth_result);
  });
};

//오늘 운동 한 정보
//나의 정보는 받아갈 수 있지만, 나랑 친구관계인 사람만 타인의 정보를 줄 수 있음.
Health.prototype.getHealth = function(id, callback){
  console.log("get Health!");
  async.waterfall([
    function(callback){
      connection.getConnection(function(err, connection){
        callback(null, connection);
      });
    },
    function(connection, callback){
      connection.query("SELECT id,date,health_name,health_count FROM health where id = ?", id, function(query_error, query_result){
        console.log("release connection!")
        connection.release();
        if(query_error){
          console.log("query error : " + query_error);
        }
        callback(JSON.parse(JSON.stringify(query_error)), query_result);
      });
    }
  ], function(err,result){
    callback(err, result);
  });
};

//오늘 운동 한 정보를 삭제
Health.prototype.deleteHealth = function(params, callback){
  console.log("DELETE health!");
  async.waterfall([
    function(callback){
      connection.getConnection(function(err, connection){
        callback(null, connection);
      });
    },
    function(connection, callback){
      connection.query("DELETE FROM health WHERE id = ? and health_name = ? and health_count = ? and date = ?",
       [params.id, params.health_name, params.health_count, params.date],
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
  function(async_waterfall_error, deleteHealth_result){
    callback(async_waterfall_error, deleteHealth_result);
  });
};

module.exports = Health;

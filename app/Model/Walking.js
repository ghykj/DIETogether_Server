var connection = require('../../lib/connection');
var async = require('async');
var moment = require('moment');

//Constructor
function Walking(){
  this.id = "";
  this.walking_count = 0;
  this.calorie = 0;
  this.date = "";
}

//매일 23:59:59에 생성
Walking.prototype.createWalking = function(params, callback){

  var data = {
    id: params.id,
    walking_count: 0,
    calorie: 0,
    date: moment().format('YYYY-MM-DD')
  };

  async.waterfall([
    function(callback){
      connection.getConnection(function(err, connection){
        callback(null, connection);
      });
    },
    function(connection, callback){
      connection.query("INSERT INTO walking SET ?", data, function(query_error, query_result){
        console.log("release connection!")
        connection.release();
        if(query_error){
          console.log("query error : " + query_error);
        }
        callback(JSON.parse(JSON.stringify(query_error)), query_result);
      });
    }
  ],
  function(async_waterfall_error, createWalking_result){
    callback(async_waterfall_error, createWalking_result);
  });
};

//update
Walking.prototype.updateWalking = function(params, callback){
  //id가 있어야함.
  //id와 date로 결정.
  var data = {
    id: params.id,
    walking_count: params.walking_count,
    calorie: params.calorie,
    date: moment().format('YYYY-MM-DD')
  };

  async.waterfall([
    function(callback){
      connection.getConnection(function(err, connection){
        callback(null, connection);
      });
    },
    function(connection, callback){
      connection.query("UPDATE walking SET walking_count = ?, calorie = ? where id = ? and date = ?", [data.walking_count, data.calorie, data.id, data.date], function(query_error, query_result){
        console.log("release connection!")
        connection.release();
        if(query_error){
          console.log("query error : " + query_error);
        }
        callback(JSON.parse(JSON.stringify(query_error)), query_result);
      });
    }
  ],
  function(async_waterfall_error, updateWalking_result){
    callback(async_waterfall_error, updateWalking_result);
  });
};

Walking.prototype.getWalking = function(id, callback){
  console.log("get Walking!");
  async.waterfall([
    function(callback){
      connection.getConnection(function(err, connection){
        callback(null, connection);
      });
    },
    function(connection, callback){
      connection.query("SELECT id,date,walking_count,calorie FROM walking where id = ?", id, function(query_error, query_result){
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


module.exports = Walking;

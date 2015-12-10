var express = require('express');
var router = express.Router();
var connection = require('../lib/connection');
var async = require('async');

//localhost:333/db/user
router.get('/user', function(req, res) {
  async.waterfall([
    function(callback){
      connection.getConnection(function(err, connection){
        callback(null, connection);
      });
    },
    function(connection, callback){
      connection.query("SELECT * FROM user", function(query_error, query_result){
        console.log("release connection!")
        connection.release();
        if(query_error){
          console.log("query error : " + query_error);
        }
        callback(JSON.parse(JSON.stringify(query_error)), query_result);
      });
    }
  ], function(err, result){
    res.json(result);
  });
});

router.get('/health', function(req,res){
  async.waterfall([
    function(callback){
      connection.getConnection(function(err, connection){
        callback(null, connection);
      });
    },
    function(connection, callback){
      connection.query("SELECT id,date,health_name,health_count FROM health", function(query_error, query_result){
        console.log("release connection!")
        connection.release();
        if(query_error){
          console.log("query error : " + query_error);
        }
        callback(JSON.parse(JSON.stringify(query_error)), query_result);
      });
    }
  ], function(err, result){
    res.json(result);
  });
});

router.get('/walking', function(req,res){
  async.waterfall([
    function(callback){
      connection.getConnection(function(err, connection){
        callback(null, connection);
      });
    },
    function(connection, callback){
      connection.query("SELECT id,date,walking_count,calorie FROM walking", function(query_error, query_result){
        console.log("release connection!")
        connection.release();
        if(query_error){
          console.log("query error : " + query_error);
        }
        callback(JSON.parse(JSON.stringify(query_error)), query_result);
      });
    }
  ], function(err, result){
    res.json(result);
  });
});

router.get('/friendship', function(req,res){
  async.waterfall([
    function(callback){
      connection.getConnection(function(err, connection){
        callback(null, connection);
      });
    },
    function(connection, callback){
      connection.query("SELECT id,name,friends FROM friendship", function(query_error, query_result){
        console.log("release connection!")
        connection.release();
        if(query_error){
          console.log("query error : " + query_error);
        }
        callback(JSON.parse(JSON.stringify(query_error)), query_result);
      });
    }
  ], function(err, result){
    res.json(result);
  });
});

module.exports = router;

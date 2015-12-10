var _ = require('underscore');
var async = require('async');
var Health = require('../app/Model/Health');

var HealthDAO = new Health();
var id_list = ['tuyy', 'admin'];
var final_result = [];

async.eachSeries(id_list, function(id, callback){
  HealthDAO.getHealth(id, function(err, results){
    async.eachSeries(results, function(result, callback){
      final_result.push(result);
      callback();
    },function(err){
      callback();
    });
  });
}, function(err){
  console.log(final_result);
});

var _ = require('underscore');
var async = require('async');
var User = require('../Model/User');
var my_id = "ghykj";

var final_json_lists = [
  {
    id: 'asdf',
    friends: [ { id: 'admin', name: '관리자' }, { id: 'ghykj', name: '김나정' } ]
  },
  {
    id: 'admin',
    friends: [ { id: 'ghykj', name: '김나정' } ]
  }
]

var can_provide_info_friends = [];

async.eachSeries(final_json_lists, function(json_data, callback){
  console.log(json_data);
  async.eachSeries(json_data.friends, function(data, callback){
    if(data.id === my_id){
      can_provide_info_friends.push(json_data.id);
    }
    callback();
  });
  callback(); // i++과 같은 역할
},function(err){
  console.log(can_provide_info_friends);
});

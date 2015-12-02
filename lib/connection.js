var mysql = require('mysql');
var db_config = require('../config/database');
var connectionPool = mysql.createPool({
  host: db_config.host,
  port: db_config.port,
  user: db_config.user,
  password: db_config.password,
  database: db_config.database,
  connectionLimit: 20,
  waitForConnections:false
});
/*
waitForConnection
- true : Pool내에 가용한 Connection이 없을 경우에 Connection이 반납되기를 기다림.
- false : Connection이 없을 경우 바로 에러를 리턴한다.
*/

var getConnection = function(done){
   connectionPool.getConnection(done);
};

module.exports = {getConnection: getConnection};

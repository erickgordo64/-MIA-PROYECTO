var oracledb = require('oracledb');
oracledb.initOracleClient({configDir: '/opt/oracle/instantclient_19_9/network/admin'});
var dbConfig = require('./dbconfig.js');

oracledb.getConnection(
{
user : dbConfig.user,
password : dbConfig.password,
connectString : dbConfig.connectString
},
function(err, connection)
{
if (err) {
console.error(err.message);
return;
}
console.log('Connection was successful!');

connection.close(
function(err)
{
if (err) {
console.error(err.message);
return;
}
});
});
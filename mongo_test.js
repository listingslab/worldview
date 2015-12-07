
var express        	= require('express');
var app            	= express();
var mongoose		= require('mongoose');

var mongoConnectStr = 'mongodb://localhost/worldview';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  mongoConnectStr = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}


app.get('*', function(req, res){
	console.log('Send response back on request');
	res.send('mongoConnectStr: ' + mongoConnectStr);
});


var port			= process.env.PORT || 8080;
var ip				= process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
app.listen(port, ip);               

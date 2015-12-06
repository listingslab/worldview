// modules =================================================
var express        	= require('express');
var app            	= express();
var mongoose		= require('mongoose');

// set our port
var port			= process.env.PORT || 8080;
var ip				= process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';



var mongoConnectStr = 'mongodb://localhost/worldview';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  mongoConnectStr = 'mongodb://' + process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}
mongoose.connect(mongoConnectStr);


//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
	res.send(mongoConnectStr + '<br />ok?');
});


// start app ===============================================
app.listen(port, ip);  

// Log to console                    
console.log('Server running on \nhttp://'+ip+':' + port);



// expose app           
exports = module.exports = app;
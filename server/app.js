// modules =================================================
var express        	= require('express');
var app            	= express();
// set our port
var port			= process.env.PORT || 8080;
var ip				= process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';




//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
	console.log('404 Error');
	res.send('welcome');
});


// start app ===============================================
app.listen(port, ip);  

// Log to console                    
console.log('Server running on \nhttp://'+ip+':' + port);



// expose app           
exports = module.exports = app;
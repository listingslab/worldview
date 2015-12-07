

console.log('Openshift MongoDB Test');

//create a very simple server using environment variables

var express        	= require('express');
var app            	= express();


app.get('*', function(req, res){
	console.log('Send response3 back on request');
	res.send('here is a response');
});

var port			= process.env.PORT || 8080;
var ip				= process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
app.listen(port, ip);               

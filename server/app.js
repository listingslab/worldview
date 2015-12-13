'use strict';
// Worldview Server by Listingslab

// Modules =================================================
var express        	= require('express');
var app            	= express();

// Set our port
var port			= process.env.PORT || 8080;
var ip				= process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

// Set the static files location /dist/img will be /img for users
app.use(express.static('./dist'));

// Start app ===============================================
app.listen(port, ip);               

// Log to console                    
console.log('Server running on \nhttp://'+ip+':' + port);

// Expose app           
exports = module.exports = app;
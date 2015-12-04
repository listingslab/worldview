// Worldview Server by Listingslab

// modules =================================================
var express        	= require('express');
var app            	= express();
var bodyParser     	= require('body-parser');
var methodOverride 	= require('method-override');

// configuration ===========================================
    
// config files
var db				= require('./config/db');
//mongoose.connect(db.url); 

// set our port
var port			= process.env.PORT || 8080;
var ip				= process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static('./public'));


// API router ==============================================
// Use the API router if the url requires it, otherwise 
// routing is handled by angular SPA

//var router			= require('./api/api_router');
//app.use('/api', router);

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
  res.send('what??? 404, brah', 404);
});



// start app ===============================================
app.listen(port, ip);               

// Log to console                    
console.log('Server running on \nhttp://'+ip+':' + port);

// expose app           
exports = module.exports = app;


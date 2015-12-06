// API Router

var express			= require('express');
var router			= express.Router();
var mongoose		= require('mongoose');

//var db				= require('./config/db');

var mongoConnectStr = 'mongodb://localhost/worldview';

// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}
console.log('Connecting to ' + mongoConnectStr);
mongoose.connect(mongoConnectStr);


var Country     	= require('./models/country');

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('API called');
    next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET /api/)
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to the worldview RESTful API' });
});


// on routes that end in /countries (accessed at GET /api/countries)
// ----------------------------------------------------
router.route('/countries')

	.get(function(req, res) {
		Country.find(function(err, countries) {
			if (err)
				res.send(err);
			res.json(countries);
		});
	});


// on routes that end in /country/:code (accessed at GET /api/country/ABW)
// ----------------------------------------------------
router.route('/country/:code')

	.get(function(req, res) {
	    Country.find({"Code": req.params.code},
	    function(err, country) {
			if (err)
				res.send(err);
			res.json(country);
		});
	});
     

// expose app           
module.exports = router;
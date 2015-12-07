// API Router

var express			= require('express');
var router			= express.Router();
var mongoose		= require('mongoose');

// TODO : extract these variables into a config file

var mongoConnectStr = 'localhost/worldview';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  mongoConnectStr = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}
mongoose.connect(mongoConnectStr);

// Middleware to use for all requests
router.use(function(req, res, next) {
    // TODO: keep track of API calls 
    console.log('Save this API call to the DB');
    next(); // make sure we go to the next routes and don't stop here
});


// Include the models
var Country         	= require('./models/country');


// Get all Continents (accessed at GET /api/continents)
// ----------------------------------------------------
router.route('/continents')
	.get(function(req, res) {
		Country.find().distinct('Continent',  function(err, continents) {
    		if (err)
				res.send(err);
			var json_continents = [];
			for (var i=0; i<continents.length; i++){
				json_continents.push ({Continent : continents[i]});
			}
			res.json(json_continents);
    	});
	});


// Get all Regions (accessed at GET /api/regions)
// ----------------------------------------------------
router.route('/regions')
	.get(function(req, res) {
		Country.find().distinct('Region',  function(err, regions) {
    		if (err)
				res.send(err);
			var json_regions = [];
			for (var i=0; i<regions.length; i++){
				json_regions.push ({Region : regions[i]});
			}
			res.json(json_regions);
    	});
	});


// Get all Countries (accessed at GET /api/countries)
// --------------------------------------------------

router.route('/countries')
	.get(function(req, res) {
		Country.find({},{
			_id			: false, 
			Name		: true,
			LocalName	: true,
			Code		: true
		},function(err, countries) {
			if (err)
				res.send(err);
			res.json(countries);
		});
	});


// on routes that end in /country/:code (accessed at GET /api/country/ABW)
// ----------------------------------------------------
router.route('/country/code/:code')

	.get(function(req, res) {
	    Country.find({
	    	'Code': req.params.code
	    },
	    function(err, country) {
			if (err)
				res.send(err);
			res.json(country);
		});
	});

// test route to make sure everything is working (accessed at GET /api/)
router.get('*', function(req, res) {
    res.json({ 
    	message		: 'Welcome to the worldview RESTful API. The endpoint does not exist. Try one of these',
    	endpoints	: [
    		{
    			url : '/api/countries',
    			desc: 'Get all countries'
    		},
    		{
    			url : '/api/ccontinent',
    			desc: 'Get all Continents'
    		}
    	]  
    });
});
     

// expose app           
module.exports = router;
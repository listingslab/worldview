// API Router

var express			= require('express');
var router			= express.Router();
var mongoose		= require('mongoose');
mongoose.connect('mongodb://localhost/worldview');

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
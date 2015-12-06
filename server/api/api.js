// call the packages we need
var express    = require('express');        
var app        = express();
var router	   = express.Router();                
var mongoose   = require('mongoose');

var url = 'mongodb://localhost/worldview';

// if OPENSHIFT env variables are present, use the available connection info:
if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    url = process.env.OPENSHIFT_MONGODB_DB_URL +
    process.env.OPENSHIFT_APP_NAME;
    
}

// Connect to mongodb
var connect = function () {
    mongoose.connect(url);
};
connect();

var db = mongoose.connection;

db.on('error', function(error){
    console.log("Error loading the db - "+ error);
});

db.on('disconnected', connect);

var Country     	= require('./models/country');


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
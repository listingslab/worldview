// server.js
// https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

// BASE SETUP
// =============================================================================

// call the packages we need
var express			= require('express');        // call express
var app				= express();                 // define our app using express
var bodyParser		= require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port 			= process.env.PORT || 8080;        // set our port

var mongoose		= require('mongoose');
mongoose.connect('mongodb://localhost/worldview'); // connect to our database

var Country     	= require('./models/country');


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('API called');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// on routes that end in /bears
// ----------------------------------------------------
router.route('/countries')

	// create a country (accessed at POST http://localhost:8080/api/countries)
    .post(function(req, res) {
        
        var country = new Country();      // create a new instance of the Country model
        country.name = req.body.name;  // set the country name (comes from the request)

        // save the country and check for errors
        country.save(function(err) {
            if (err)
                res.send(err);

           	res.json({ message: country.name + ' created!' });
        });
        
    })

    // get all the countries (accessed at GET http://localhost:8080/api/countries)
    .get(function(req, res) {
        Country.find(function(err, countries) {
            if (err)
                res.send(err);
            res.json(countries);
        });
    });

// on routes that end in /country/:code
// ----------------------------------------------------
router.route('/country/:code');



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);


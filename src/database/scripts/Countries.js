// Node JS script to move a MySql Database to Mongo DB
"use strict";

var mongoose 			= require('mongoose');
var db 					= mongoose.connection;
var countrySchema 		= new mongoose.Schema({
  Code: { type: String }
, Name: String
, Continent: String
, Region: String
, SurfaceArea: Number
, IndepYear: Number
, Population: Number
, LifeExpectancy: Number
, GNP: Number
, GNPOld: Number
, LocalName: String
, GovernmentForm: String
, HeadOfState: String
, Capital: Number
, Code2: String
},{
    versionKey: false
});
var Country 			= mongoose.model('Country', countrySchema);
var mysql      			= require('mysql');
var mysqlConnection 	= mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'world'
});

db.on('error', console.error);
db.once('open', function() {
	//saveDoc ();
	getNextRecord ();
});

function getNextRecord (){
	mysqlConnection.query("SELECT * FROM country WHERE done = 'no' LIMIT 1", function(err, rows, fields) {
		if (err) throw err;
			if ( rows[0] === undefined){
				endImport ();
			}else{
				save2Mongo (rows[0]);
			}
	});
}



function save2Mongo (record){
	
	var newCountry = new Country(record);
	newCountry.save(function(err, newCountry) {
	  if (err) return console.error(err);
	  //console.dir(newCountry);
	  console.log('Saving ' + newCountry.Name);
	  mysqlConnection.query('UPDATE country SET done = "yes" WHERE Code = "' + newCountry.Code + '"', function(err, rows, fields) {
			if (err) throw err;
			getNextRecord ();
		});
	});

}

function endImport (){
	mongoose.connection.close();
	mysqlConnection.end();
	console.log ('All done, Thanks.');
}


mongoose.connect('mongodb://localhost/worldview');
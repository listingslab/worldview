// Node JS script to move a MySql Database to Mongo DB
"use strict";

var mongoose 			= require('mongoose');
var db 					= mongoose.connection;
var citySchema 		= new mongoose.Schema({
  ID: { type: Number }
, Name: String
, CountryCode: String
, District: String
, Population: Number

},{
    versionKey: false
});
var City 				= mongoose.model('City', citySchema);
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
	mysqlConnection.query("SELECT * FROM city WHERE done = 'no' LIMIT 1", function(err, rows, fields) {
		if (err) throw err;
			if ( rows[0] === undefined){
				endImport ();
			}else{
				save2Mongo (rows[0]);
				//console.log(rows[0]);
				//endImport ();
			}
	});
}

function save2Mongo (record){
	
	var newCity = new City(record);
	newCity.save(function(err, newCountry) {
	  if (err) return console.error(err);
	  //console.dir(newCountry);
	  console.log('Saving ' + newCity.Name);
	  mysqlConnection.query('UPDATE city SET done = "yes" WHERE ID = "' + newCity.ID + '"', function(err, rows, fields) {
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
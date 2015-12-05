// models/country.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var countrySchema 		= new mongoose.Schema({
  Code: { type: String },
  Name: String, 
  Continent: String, 
  Region: String, 
  SurfaceArea: Number, 
  IndepYear: Number, 
  Population: Number, 
  LifeExpectancy: Number, 
  GNP: Number, 
  GNPOld: Number, 
  LocalName: String, 
  GovernmentForm: String, 
  HeadOfState: String, 
  Capital: Number, 
  Code2: String
},{
    versionKey: false
});

module.exports = mongoose.model('Country', countrySchema);
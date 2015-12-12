
// worldview Angular SPA
var app = angular.module('worldviewApp', []);


// countriesController
app.controller ('countriesController', function ($scope) {
	$scope.title = 'Select a Continent';


	$scope.continents = [
		{"Continent":"North America"},
		{"Continent":"Asia"},
		{"Continent":"Africa"},
		{"Continent":"Europe"},
		{"Continent":"South America"},
		{"Continent":"Oceania"},
		{"Continent":"Antarctica"}
	];
});
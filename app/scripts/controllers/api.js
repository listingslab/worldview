'use strict';

/**
 * @ngdoc function
 * @name worldviewApp.controller:ApiCtrl
 * @description
 * # ApiCtrl
 * Controller of the worldviewApp
 */
angular.module('worldviewApp')
  .controller('ApiCtrl', function () {
    this.github = {

    	// list of the api's endpoints

    	repo : 'https://github.com/listingslab/worldview'
    };
  });

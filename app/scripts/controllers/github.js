'use strict';

/**
 * @ngdoc function
 * @name worldviewApp.controller:GithubCtrl
 * @description
 * # GithubCtrl
 * Controller of the worldviewApp
 */
angular.module('worldviewApp')
  .controller('GithubCtrl', function () {
    this.github = {
    	repo : 'https://github.com/listingslab/worldview'
    };
  });

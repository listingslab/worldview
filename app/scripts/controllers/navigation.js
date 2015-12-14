'use strict';

/**
 * @ngdoc function
 * @name worldviewApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the worldviewApp
 */
angular.module('worldviewApp')
  .controller('NavigationCtrl', function ($scope, $location) {
    
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.isCurrentPath = function (path) {
     
    	//console.log ('is it? ' + $location.path());
    	//var result = 
    	//console.log ('path? ' + result);
     	return $location.path() === path;

    };

  });
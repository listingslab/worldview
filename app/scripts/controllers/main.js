'use strict';

/**
 * @ngdoc function
 * @name worldviewApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the worldviewApp
 */
angular.module('worldviewApp')
  .controller('MainCtrl', function ($scope) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.at = this.awesomeThings;


  });

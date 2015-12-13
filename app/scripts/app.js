'use strict';

/**
 * @ngdoc overview
 * @name worldviewApp
 * @description
 * # worldviewApp
 *
 * Main module of the application.
 */
angular
  .module('worldviewApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/github', {
        templateUrl: 'views/github.html',
        controller: 'GithubCtrl',
        controllerAs: 'github'
      })
      .when('/api', {
        templateUrl: 'views/api.html',
        controller: 'ApiCtrl',
        controllerAs: 'api'
      })
      .otherwise({
        redirectTo: '/404.html'
      });

      $locationProvider.html5Mode(true);
  });

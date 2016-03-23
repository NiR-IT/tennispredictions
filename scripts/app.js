'use strict';

var app = angular
  .module('tennisApp', [
    'ngAnimate',
    'ngResource',    
    'ngRoute',    
    'firebase',
    'toaster',
    'angularMoment'
  ])
  .constant('FURL', 'https://sportpredictions.firebaseio.com/')  
  .config(function ($routeProvider) {
    $routeProvider      
      .when('/', {
        templateUrl: 'views/browse.html',
        controller: 'BrowseController'        
      })
      .when('/browse/:predictionId', {
        templateUrl: 'views/browse.html',
        controller: 'BrowseController'         
      })
      .when('/history', {
        templateUrl: 'views/history.html',
        controller: 'BrowseController'  
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthController'         
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthController'      
      })
      .otherwise({
        redirectTo: '/'
      });
  });

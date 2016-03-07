
//Global CONSTANTS

var app = angular.module('clashDirector',['ngRoute', 'ui.bootstrap']);

app.config(['$routeProvider', '$httpProvider', '$locationProvider', 
  function($routeProvider, $httpProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index.html',
        controller: 'MainController'
      }).
      when('/war/:id', {
        templateUrl: 'partials/war.html',
        controller: 'WarController'
      }).
      otherwise({
        redirectTo: '/'
      });

    if(window.history && window.history.pushState) {
        $locationProvider.html5Mode({
         enabled: true,
         requireBase: false
       });
    }
  }]);
    
    
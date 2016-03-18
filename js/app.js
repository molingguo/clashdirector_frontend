
//Global CONSTANTS

var app = angular.module('clashDirector',['ngRoute', 'ui.bootstrap']);

app.config(['$routeProvider', '$httpProvider', '$locationProvider', 
  function($routeProvider, $httpProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        // templateUrl: 'partials/_index.html',
        // controller: 'MainController'
        templateUrl: 'partials/_claninfo.html',
        controller: 'ClanInfoController'
      }).
      when('/claninfo', {
        templateUrl: 'partials/_claninfo.html',
        controller: 'ClanInfoController'
      }).
      when('/clanwar', {
        templateUrl: 'partials/_clanwar-new.html',
        controller: 'ClanWarController'
      }).
      when('/clanwarplanner', {
        templateUrl: 'partials/_clanwar-planner.html',
        controller: 'ClanWarController'
      }).
      when('/war/:id', {
        templateUrl: 'partials/_war.html',
        controller: 'WarController'
      }).
      otherwise({
        redirectTo: '/'
      });

    // if(window.history && window.history.pushState) {
    //     $locationProvider.html5Mode({
    //      enabled: true,
    //      requireBase: false
    //    });
    // }
  }]);
    
    
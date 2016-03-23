
//Global CONSTANTS

var app = angular.module('clashDirector',['ngRoute', 'ui.bootstrap', 'ngDragDrop']);

app.config(['$routeProvider', '$httpProvider', '$locationProvider', 
  function($routeProvider, $httpProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/_login.html',
        controller: 'LoginController'
        // templateUrl: 'partials/_claninfo.html',
        // controller: 'ClanInfoController'
      }).
      when('/login', {
        templateUrl: 'partials/_login.html',
        controller: 'LoginController'
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
        controller: 'ClanWarPlannerController'
      }).
      when('/warlog', {
        templateUrl: 'partials/_warlog.html',
        controller: 'WarLogController'
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


/*
Ordinal Filter
 */
app.factory('ordinalService', function () {
  var ordinal = function (input) {
    var n = input % 100;
    return n === 0 ? 'th' : (n < 11 || n > 13) ?
    ['st', 'nd', 'rd', 'th'][Math.min((n - 1) % 10, 3)] : 'th';
  };
  return {
    ordinal: ordinal
  };
})
.filter('ordinal', ['ordinalService', function (ordinalService) {
  return function (input) {
    return input + ordinalService.ordinal(input);
  };
}])
.filter('ordinalOnly', ['ordinalService', function (ordinalService) {
  return function (input) {
    return ordinalService.ordinal(input);
  };
}]);

    
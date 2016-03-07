app.controller('WarController', function ($scope, $routeParams, wars) {
	$scope.war = wars.wars[$routeParams.id];
});
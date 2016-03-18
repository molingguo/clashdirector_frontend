app.controller('WarController', function ($scope, $routeParams, wars) {
	//$scope.war = wars.wars[$routeParams.id];
	wars.getWars().success(function(data) {
		$scope.war = data.wars[$routeParams.id]
	})
});
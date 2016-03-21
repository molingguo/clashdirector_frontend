app.controller('WarLogController', function($http, $scope, $location, wars, configure) {
	wars.setActiveLink("warlog");

	$scope.clanName = "USA UNITED";
	wars.getWars().success(function(data) {
		$scope.wars = data;
	});
});
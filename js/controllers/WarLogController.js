app.controller('WarLogController', function($http, $scope, $location, wars, configure, Auth) {
	wars.setActiveLink("warlog");
	$scope.isLeader = function() {
		return Auth.isLeader();
	}

	$scope.clanName = "USA UNITED";
	wars.getWars().success(function(data) {
		$scope.wars = data.reverse();
	});

	$scope.formatDate = function(date) {
		return moment(date).format("MMM D");
	}
});
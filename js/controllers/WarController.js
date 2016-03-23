app.controller('WarController', function ($scope, $routeParams, wars) {
	wars.setActiveLink("warlog");
	$scope.clanName = "USA UNITED";

	wars.getWars().success(function(data) {
		$scope.war = data.reverse()[$routeParams.id];
		$scope.warDate = moment($scope.war.date);

		if ($scope.war.won) {
			$scope.wonText = "Victory";
		} else {
			$scope.wonText = "Defeat";
		}
	});

	$scope.getAttackTarget = function(target) {
		if(target==null) {
			return "Not Used";
		}	
		else return target;
	}
});
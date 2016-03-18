app.controller('ClanInfoController', function($http, $scope, wars, configure) {
	$scope.clanRoleList = configure.clanRoleList;

	$http.get("../../sample.json").success(function(data) {
		console.log(data);
		$scope.members = data.clanDetails.results.memberList;
		$scope.clanBadge = data.clanDetails.results.clanBadgeImg.xl;
		$scope.clanName = data.clanDetails.results.name;
		$scope.clanTag = data.clanDetails.results.tag;
		$scope.clanDescription = data.clanDetails.results.description;
		$scope.clanLevel = data.clanDetails.results.clanLevel;
		$scope.location = data.clanDetails.results.locationName;
		$scope.warWins = data.clanDetails.results.warWins;
		$scope.memberLength = data.clanDetails.results.members;
	});
});
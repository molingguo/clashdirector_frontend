app.controller('MainController', function($http, $scope, $location, wars, configure, Auth) {
	//var clanID = "22CQYPVG";
	// var clanID = "2VLPPLCP";
	// $http.get("https://set7z18fgf.execute-api.us-east-1.amazonaws.com/prod/?route=getClanDetails&clanTag=%23"+clanID).success(function(data) {
	// 	console.log(data);
	// 	//getJSON(data);
	// 	$scope.members = data.clanDetails.results.memberList;
	// 	console.log($scope.members);
	// });
	// 
	$scope.getActiveLink = function() {
		return wars.getActiveLink();
	}

	if (!Auth.isLoggedIn()) {
		$location.path('login');
	}
});
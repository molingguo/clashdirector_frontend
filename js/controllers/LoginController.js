app.controller('LoginController', function($http, $scope, $location, wars, configure, Auth) {	
	wars.setActiveLink("login");
	$scope.rememberMe = false;

	if (Auth.isLoggedIn()) {
		console.log('loggedin');
		$location.path('claninfo');
		return;
	}

	$scope.signUp = function() {
		Auth.setUser("register");
		$location.path('claninfo');
	}

	$scope.login = function() {
		Auth.setUser("login");
		$location.path('claninfo');
	}
});
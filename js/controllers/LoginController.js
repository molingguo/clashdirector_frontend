app.controller('LoginController', function($http, $scope, $location, wars, configure, Auth) {	
	wars.setActiveLink("login");
	$scope.rememberMe = false;
	$scope.alternativeLogin = 'username';

	if (Auth.isLoggedIn()) {
		console.log('loggedin');
		$location.path('claninfo');
		return;
	}

	$scope.loginInfo = {
		username: '',
		password: ''
	};

	$scope.signUp = function() {
		Auth.setSampleLeader();
		$location.path('claninfo');
	}

	$scope.logIn = function() {
		var user = Auth.checkLogin($scope.loginInfo.username);
		if (user) {
			Auth.setUser(user);
			console.log("logged in");
			$location.path('claninfo');
		} else {
			alert("user doesn't exist!");
		}
	}
});
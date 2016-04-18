app.controller('MainController', function($http, $scope, $location, $uibModal, $log, wars, configure, Auth) {
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

	$scope.isLoggedIn = function() {
		return Auth.isLoggedIn();
	}

	$scope.getUser = function() {
		return Auth.getUser();
	}

	$scope.logout = function() {
		Auth.setUser(null);
		$location.path('login');
	}

	$scope.logoutModal = function (size) {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'partials/_confirmCancel.html',
			controller: 'ModalController',
			size: size,
			resolve: {
				messageHeader: function() {
					return configure.modalDialog.confirmation;
				},
				message: function () {
					return configure.modalDialog.logoutMessage;
				},
				onlyOneButton: function() {
					return false;
				},
				okayText: function() {
					return "Okay";
				}
			}
		});

		modalInstance.result.then(function () {
			$scope.logout();
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};
});
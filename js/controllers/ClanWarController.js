app.controller('ClanWarController', function($http, $scope, $location, wars, $uibModal, $log, configure) {

	//$route.current.templateUrl = "../../partials/_clanwar-new.html";
	$scope.warSizeOptions = configure.warSizeOptions;
	// $scope.warSize = 
	$scope.currentWar = null;
	$scope.warMembers = [];
	$scope.planner = configure.planner;

	if ($scope.currentWar) {
		$location.path('clanwarplanner');
	} else {
		$location.path('clanwar');
	}

	$http.get("../../sample.json").success(function(data) {
		$scope.members = data.clanDetails.results.memberList;
	});

	wars.getWars().success(function(data) {
		$scope.wars = data.wars;
	});

	$scope.addNewWar = function(warSize) {
		var newWar = {
			size: warSize,
			isActive: true
		};
		$scope.wars.push(newWar);
		$scope.currentWar = newWar;
		$location.path('clanwarplanner');
		//$route.current.templateUrl = "../../partials/_clanwar-planner.html";
	}
	
	$scope.openModal = function (size) {

		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'partials/_modalDialog.html',
			controller: 'ModalController',
			size: size,
			resolve: {
				members: function() {
					return $scope.members;
				}

			}
		});

		modalInstance.result.then(function (warSize, warMembers) {
			$scope.addNewWar(warSize);
			console.log(warSize);
			$scope.warSize = warSize;
			$scope.warMembers = warMembers;
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};
});
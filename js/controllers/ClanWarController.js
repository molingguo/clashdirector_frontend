app.controller('ClanWarController', function($http, $scope, $location, wars, $uibModal, $log, configure) {
	wars.setActiveLink("clanwar");

	if (wars.getCurrentWar()) {
		$location.path('clanwarplanner');
		return;
	}

	$scope.range = function(start, stop) {
		return _.range(start, stop);
	}

	wars.getMembers().success(function(data) {
		$scope.members = data.clanDetails.results.memberList;
	});

	wars.getWars().success(function(data) {
		$scope.wars = data;
	});

	$scope.addNewWar = function(warSize) {
		var newWar = {
			size: Number(warSize.substring(0, 2))
		};
		$scope.wars.push(newWar);
		wars.setCurrentWar(newWar);
		$location.path('clanwarplanner');
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

		modalInstance.result.then(function (warSize) {
			$scope.addNewWar(warSize);
			console.log(warSize);
			$scope.warSize = warSize;
			$scope.warMembers = wars.getWarMembers();
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};
});
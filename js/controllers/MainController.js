app.controller('MainController', function($http, $scope, wars, $uibModal, $log) {
	$http.get("https://set7z18fgf.execute-api.us-east-1.amazonaws.com/prod/?route=getClanDetails&clanTag=%2322CQYPVG").success(function(data) {
		console.log(data);
		$scope.members = data.clanDetails.results.memberList;
		console.log($scope.members);
	});

	$scope.wars = wars.wars;
	$scope.addNewWar = function(warSize) {
		$scope.wars.push({size: warSize});
		console.log($scope.wars);
	}

	$scope.warSizeOptions = ["10 vs 10", "15 vs 15", "20 vs 20", "25 vs 25", "30 vs 30", "35 vs 35", "40 vs 40", "45 vs 45", "50 vs 50"];

	$scope.openModal = function (size) {

		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'partials/modalDialog.html',
			controller: 'ModalController',
			size: size,
			resolve: {
				warSizeOptions: function() {
					return $scope.warSizeOptions;
				},
				members: function() {
					return $scope.members;
				}

			}
		});

		modalInstance.result.then(function (warSize) {
			$scope.addNewWar(warSize);
			console.log(warSize);
			$scope.warSize = warSize;
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};

});